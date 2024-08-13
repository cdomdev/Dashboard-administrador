import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

const Elminar = ({ producto, setProductos }) => {
  const [showModal, setShowModal] = useState(false);

  //   solcitud para elminar producto seleccionado

  // const handleDelete = () => {
  //   api
  //     .delete(`${API_HOST}/api/inventary/products/delete/${producto.id}`, {
  //       data: { producto_Id: producto.id },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       if (response.status === 200) {
  //         setProductos(response.data.daleteUpdate);
  //         setBgToast("success");
  //         setToastMessage("Producto eliminado con exito");
  //         setShowToast(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       if (error.response.status === 403) {
  //         setBgToast("danger");
  //         setToastMessage("No tienes los permisos para esta operacion");
  //         setShowToast(true);
  //       }
  //       setBgToast("danger");
  //       setToastMessage(
  //         "Hubo un error al eliminar el producto, intentalo de nuevo"
  //       );
  //       setShowToast(true);
  //     });
  // };

  return (
    <>
      <Button
        variant="outline-danger"
        className="btn-custome-inventary"
        onClick={() => setShowModal(true)}>
        Eliminar
      </Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        className="modal-delete-inventary">
        <Modal.Header className="flex text-center justify-center m-0 p-1">
          <Modal.Title className="text-lg">
            ¡Esta apunto de eliminar un producto!
          </Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body className="">
          {/* <CiWarning className="icon-warning-modal-delete" /> */}
          <span>Se eliminara la cantidad total de inventario.</span>
          <p className="warning">
            !Esta seguro de querer eliminar el producto
            <strong> {producto?.nombre}.</strong> En inventario tiene
            <strong> {producto?.Inventarios[0].cantidad} productos</strong>!
          </p>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }} className="content-modal-btns">
          <Button variant="danger">Elimininar producto</Button>
          <Button
            variant="light"
            className="mt-1 delete bg-white"
            onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Elminar;
