import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const Editar = ({ producto, currentStock, setProductos }) => {
  const [showModal, setShowModal] = useState(false);
  const [newStock, setNewStock] = useState(currentStock);

  // const handleSaveChanges = () => {
  //   if (!isNaN(newStock) && newStock.trim() !== "") {
  //     const updatedStock = parseInt(newStock);
  //     api
  //       .put(`${API_HOST}/api/inventary/products/update-stock/${producto.id}`, {
  //         producto_Id: producto.id,
  //         newStock: updatedStock,
  //       })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setProductos(response.data.inventaryUpdate);
  //           setToastMessage("Cantidad en stock actualizada con exito");
  //           setBgToast("success");
  //           setShowToast(true);
  //         }
  //       })
  //       .catch((error) => {
  //         if (error.response.status === 403) {
  //           setToastMessage("No tienes los permisos para esta operacion");
  //           setBgToast("danger");
  //           setShowToast(true);
  //         } else if (
  //           error.response.status === 400 ||
  //           error.response.status === 500
  //         ) {
  //           setToastMessage(
  //             "No se puedo actulizar la cantidad en stock, intentale de nuevo"
  //           );
  //           setBgToast("danger");
  //           setShowToast(true);
  //         }
  //         console.error("Error al actulizar el inventario", error);
  //       });
  //   } else {
  //     setToastMessage("Ingrese una cantidad para actulizar el inventario");
  //     setBgToast("warning");
  //     setShowToast(true);
  //   }
  // };

  return (
    <>
      <Button
        variant="outline-primary"
        className="btn-custome-inventary"
        onClick={() => setShowModal(true)}>
        Actualizar Stock
      </Button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-edit-inventary">
        <Modal.Header closeButton>
          <Modal.Title>Modificar cantidad en inventario</Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body className="modal-body-editar-inventary">
          <p className="text-modal-inventary">
            En esta seccion podra modificar la cantidad en inventario del
            producto seleccionado.
          </p>
          <br />
          <p>Ingrese la nueva cantidad en inventario:</p>
          <Form.Control
            className="mt-3"
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Button variant="primary">Guardar cambios</Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Editar;
