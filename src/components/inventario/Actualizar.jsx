import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { listarCat } from "../../services/categorias";
import { listarSub } from "../../services/subcategorias";
import { updateDataProduct } from "@/services/inventario";

const Actualizar = ({
  producto,
  setData,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategoria, setSelectedCategoria] = useState(
    producto.categoria_id || ""
  );
  const [selectedSubCategoria, setSelectedSubCategoria] = useState(
    producto.subcategoria_id || ""
  );

  // referencias para los productos

  const tituloRef = useRef(null);
  const nombreRef = useRef(null);
  const valorRef = useRef(null);
  const referenciaRef = useRef(null);
  const descripcionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasResult, subcategoriasResult] = await Promise.all([
          listarCat(),
          listarSub(),
        ]);

        setCategorias(categoriasResult || []);
        setSubcategorias(subcategoriasResult.categorias || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategoria(event.target.value);
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubCategoria(event.target.value);
  };

  const handleInputChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Obtener los valores actuales de los campos o utilizar los valores por defecto del producto
    const updatedNombre = nombreRef.current.value || producto.nombre;
    const updatedMarca = tituloRef.current.value || producto.marca;
    const updatedValor = parseFloat(valorRef.current.value) || producto.valor;
    const updatedDescripcion =
      descripcionRef.current.value || producto.description;
    const updatedReferencia =
      referenciaRef.current.value || producto.referencia;

    const updatedCategoria = selectedCategoria || producto.categoria_id;
    const updatedSubcategoria =
      selectedSubCategoria || producto.subcategoria_id;

    //  nuevo objeto con la informacion el producto
    const productosActualizado = {
      nombre: updatedNombre,
      marca: updatedMarca,
      valor: updatedValor,
      description: updatedDescripcion,
      referencia: updatedReferencia,
      categoria_id: updatedCategoria,
      subcategoria_id: updatedSubcategoria,
    };

    try {
      const response = await updateDataProduct(
        productosActualizado,
        producto.id
      );
      if (response.status === 200) {
        setShowModal(false);
        setData(response.data.productosUpdate);
        setBgToast("success");
        setToastMessage("Producto actualizado con exito");
        setShowToast(true);
      }
    } catch (error) {
      console.log("Error en el servidor", error);
      setBgToast("danger");
      setToastMessage(
        "Hubo un error al acualizar datos del producto, intentelo de nuevo"
      );
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline-success"
        className="text-xs md:text-sm"
        onClick={() => setShowModal(true)}>
        Actualizar producto
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="py-1 px-3">
          <Modal.Title className="text-lg font-semibold">
            Actulizar informacion del producto
          </Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body className="px-4 py-2">
          <p className="text-base text-wrap py-2">
            En esta seccion puede modificar valores como: <br />
            <strong className="text-blue-600">
              {" "}
              Nombre, precio, referencia, categoria o descripcion
            </strong>{" "}
            del producto selecionado.
          </p>
          <Form>
            <Form.Control
              type="text"
              name="titulo"
              className="mt-3 focus:outline-none shadow-none focus:border-slate-300  rounded-md  border-gray-200"
              defaultValue={producto.nombre}
              ref={nombreRef}
            />
            <Form.Control
              type="text"
              name="titulo"
              className="titulo-editado mt-2  focus:outline-none shadow-none focus:border-slate-300 rounded-md  border-gray-200"
              defaultValue={producto.marca}
              ref={tituloRef}
            />
            <Form.Control
              placeholder="Actualizar precio"
              name="valor"
              defaultValue={parseInt(producto.valor, 10)}
              className="mt-2 focus:outline-none shadow-none focus:border-slate-300 py-2"
              ref={valorRef}
            />
            <Form.Control
              placeholder="Actualizar referencia"
              name="referencia"
              defaultValue={producto.referencia}
              className="mt-2 focus:outline-none shadow-none focus:border-slate-300 py-2"
              ref={referenciaRef}
            />

            <Form.Control
              as="select"
              onChange={handleCategoryChange}
              className="mt-2 focus:outline-none shadow-none focus:border-slate-300 py-2"
              value={selectedCategoria}>
              <option value="">
                {producto && producto.categoria
                  ? producto.categoria.nombre
                  : "Selecciona una categoría"}
              </option>
              {categorias &&
                categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
            </Form.Control>
            <Form.Control
              as="select"
              className="mt-2 focus:outline-none shadow-none focus:border-slate-300 py-2"
              onChange={handleSubcategoryChange}
              value={selectedSubCategoria}>
              <option value="">
                {producto && producto.subcategoria
                  ? producto.subcategoria.nombre
                  : "Selecciona una subcategoría"}
              </option>
              {subcategorias.map((subcategoria) => (
                <option key={subcategoria.id} value={subcategoria.id}>
                  {subcategoria.nombre}
                </option>
              ))}
            </Form.Control>
            <Form.Control
              as="textarea"
              name="descripcion"
              defaultValue={producto.description}
              className="descripcion-editada mt-3 focus:outline-none shadow-none focus:border-slate-300"
              ref={descripcionRef}
            />
            <span className="w-full ">
              <Button onClick={handleInputChange} className="w-full my-3">
                {isLoading ? (
                  <div className="spinner-container">
                    <Spinner animation="border" role="status" size="sm" />
                  </div>
                ) : (
                  <p className="text-lg">Actualizar producto</p>
                )}
              </Button>
            </span>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Actualizar;
