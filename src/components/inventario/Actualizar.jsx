import { Button, Modal, Form } from "react-bootstrap";
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

  const handleToast = (bgName, message) => {
    setBgToast(bgName);
    setShowToast(true);
    setToastMessage(message);
    setIsLoading(false);
    setShowModal(false);
  };

  const handleInputChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      if (response && response.status === 200) {
        setData(response.data.productosUpdate);
        handleToast("success", "Producto actualizado con exito");
      } else if (response.status === 404) {
        handleToast(
          "warning",
          "Algo salio mal al intentar actulizar el producto, intentalo de nuevo"
        );
      }
    } catch (error) {
      console.error(
        "Error al actualizar la información del producto en inventario:",
        error
      );

      const status = error.response.status || error.status;
      if (status === 401 || status === 403) {
        handleToast("warning", "No tienes los permisos para esta operación");
      } else if (status === 500) {
        handleToast(
          "danger",
          "Hubo un error al actualizar los datos del producto, inténtelo de nuevo"
        );
      }
      handleToast(
        "danger",
        "Hubo un error al actualizar los datos del producto, inténtelo de nuevo"
      );
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
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="font-">
        <Modal.Header closeButton className="py-1 px-3">
          <Modal.Title className="text-lg font-semibold">
            Actulizar informacion del producto
          </Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body className="px-4 py-2">
          <p className=" text-wrap py-2 text-sm">
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-2"
              defaultValue={producto.nombre}
              ref={nombreRef}
            />
            <Form.Control
              type="text"
              name="titulo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-2"
              defaultValue={producto.marca}
              ref={tituloRef}
            />
            <Form.Control
              placeholder="Actualizar precio"
              name="valor"
              defaultValue={parseInt(producto.valor, 10)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-2"
              ref={valorRef}
            />
            <Form.Control
              placeholder="Actualizar referencia"
              name="referencia"
              defaultValue={producto.referencia}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-2"
              ref={referenciaRef}
            />

            <Form.Control
              as="select"
              onChange={handleCategoryChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-2"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-2"
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
              rows={10}
              defaultValue={producto.description}
              className="bg-gray-50 border min-h-52 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-2"
              ref={descripcionRef}
            />
            <span className="w-full ">
              <Button onClick={handleInputChange} className="w-full my-3">
                {isLoading ? "Actulizando..." : "Actualizar"}
              </Button>
            </span>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Actualizar;
