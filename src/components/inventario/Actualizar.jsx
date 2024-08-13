import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
// import { useNotification } from "../../../hook";
// import { NotificationToast } from "../../common/NotificationToast";
// import { isEqual } from "lodash";
// import { API_HOST } from "../../../config/config";
// import { api } from "../../../config/axios.conf";

const Actualizar = ({ producto, setProductos }) => {
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const [selectedCategoria, setSelectedCategoria] = useState(
  //   producto.categoria_id || ""
  // );
  // const [selectedSubCategoria, setSelectedSubCategoria] = useState(
  //   producto.subcategoria_id || ""
  // );

  // const { setShowToast, setToastMessage, setBgToast } = useNotification();

  // // referencias para los productos

  // const tituloRef = useRef(null);
  // const nombreRef = useRef(null);
  // const valorRef = useRef(null);
  // const referenciaRef = useRef(null);
  // const descripcionRef = useRef(null);

  // useEffect(() => {
  //   // Peticion de la categoria
  //   const fetchData = async () => {
  //     await api
  //       .get(`${API_HOST}/api/categories/list`)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setCategorias(response.data.categorias);
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(`Error al obtener las categorias ${e}`);
  //       });
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await api
  //       .get(`${API_HOST}/api/subcategories/list`)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setSubcategorias(response.data.categorias);
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  //   fetchData();
  // }, [categorias]);

  // // funcion para tomar nuevs valores en las categorias - subcategorias

  // const handleCategoryChange = (event) => {
  //   setSelectedCategoria(event.target.value);
  // };

  // const handleSubcategoryChange = (event) => {
  //   setSelectedSubCategoria(event.target.value);
  // };

  // const handleInputChange = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   // Obtener los valores actuales de los campos o utilizar los valores por defecto del producto
  //   const updatedNombre = nombreRef.current.value || producto.nombre;
  //   const updatedMarca = tituloRef.current.value || producto.marca;
  //   const updatedValor = parseFloat(valorRef.current.value) || producto.valor;
  //   const updatedDescripcion =
  //     descripcionRef.current.value || producto.description;
  //   const updatedReferencia =
  //     referenciaRef.current.value || producto.referencia;

  //   const updatedCategoria = selectedCategoria || producto.categoria_id;
  //   const updatedSubcategoria =
  //     selectedSubCategoria || producto.subcategoria_id;

  //   //  nuevo objeto con la informacion el producto
  //   const productosActualizado = {
  //     nombre: updatedNombre,
  //     marca: updatedMarca,
  //     valor: updatedValor,
  //     description: updatedDescripcion,
  //     referencia: updatedReferencia,
  //     categoria_id: updatedCategoria,
  //     subcategoria_id: updatedSubcategoria,
  //   };

  //   // Validar si hay cambios en el producto
  //   const hasChanges = !isEqual(productosActualizado, producto);

  //   try {
  //     // hacer solicitud para actulizar el producto en db
  //     // validamos que haya un nuevo producto
  //     if (!hasChanges) {
  //       setBgToast("danger");
  //       setShowToast(true);
  //       setToastMessage("No hay cambios para actualizar este producto");
  //     } else {
  //       api
  //         .put(`${API_HOST}/api/inventary/products/update/${producto.id}`, {
  //           producto_Id: producto.id,
  //           newProduct: productosActualizado,
  //         })
  //         .then((response) => {
  //           if (response.status === 200) {
  //             setProductos(response.data.productosUpdate);
  //             setBgToast("success");
  //             setToastMessage("Producto actulizado con exito");
  //             setShowToast(true);
  //           }
  //         });
  //     }
  //   } catch (error) {
  //     if (error.response.status === 403) {
  //       setShowToast(true);
  //       setToastMessage("No tienes los permisos para esta operacion");
  //       setBgToast("danger");
  //     }
  //     console.log("Error en el servidor", error);
  //     setShowToast(true);
  //     setToastMessage("No se puedo actulizar el producto, intentalo de nuevo");
  //     setBgToast("danger");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <Button
        variant="outline-success"
        className="btn-custome-inventary"
        onClick={() => setShowModal(true)}>
        Actualizar inventario
      </Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-update-inventory-products">
        <Modal.Header closeButton>
          <Modal.Title className="title-modal-update">
            Actulizar informacion del producto
          </Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body className="modal-body-update-inventory">
          <p className="text-modal-update-inventary">
            En esta seccion puede modificar valores como: <br />
            Nombre, precio, referencia, categoria o descripcion del producto
            selecionado.
          </p>
          <Form>
            <Form.Control
              type="text"
              name="titulo"
              className="titulo-editado mt-3"
              defaultValue={producto?.nombre}
              // ref={nombreRef}
            />
            <Form.Control
              type="text"
              name="titulo"
              className="titulo-editado mt-3"
              defaultValue={producto?.marca}
              // ref={tituloRef}
            />
            <Form.Control
              placeholder="Actualizar precio"
              name="valor"
              defaultValue={parseInt(producto?.valor, 10)}
              className="mt-2"
              // ref={valorRef}
            />
            <Form.Control
              placeholder="Actualizar referencia"
              name="referencia"
              defaultValue={producto?.referencia}
              className="mt-2"
              // ref={referenciaRef}
            />

            {/* <Form.Control
              as="select"
              onChange={handleCategoryChange}
              className="mt-2"
              value={selectedCategoria}>
              <option value="">
                {producto.categoria
                  ? producto.categoria.nombre
                  : "Selecciona una categoría"}
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Control>
            <Form.Control
              as="select"
              className="mt-2"
              onChange={handleSubcategoryChange}
              value={selectedSubCategoria}>
              <option value="">
                {producto.subcategoria
                  ? producto.subcategoria.nombre
                  : "Selecciona una subcategoría"}
              </option>
              {subcategorias.map((subcategoria) => (
                <option key={subcategoria.id} value={subcategoria.id}>
                  {subcategoria.nombre}
                </option>
              ))}
            </Form.Control> */}
            <Form.Control
              as="textarea"
              name="descripcion"
              // defaultValue={producto.description}
              className="descripcion-editada mt-3"
              // ref={descripcionRef}
            />
            <span className="content-btn-card">
              <Button className="btn-custom mt-3">
                {isLoading ? (
                  <div className="spinner-container">
                    <Spinner animation="border" role="status" size="sm" />
                  </div>
                ) : (
                  <>Actualizar</>
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
