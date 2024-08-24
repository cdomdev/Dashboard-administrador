import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { stockUpdate } from "../../services/inventario";

const Editar = ({
  producto,
  currentStock,
  setProductos,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newStock, setNewStock] = useState(currentStock);

  const handleSaveChanges = async () => {
    if (!isNaN(newStock) && newStock.trim() !== "") {
      try {
        const updatedStock = parseInt(newStock);
        const response = await stockUpdate(updatedStock, producto.id);
        if (response.status === 200) {
          setShowModal(false);
          setProductos(response.data.inventaryUpdate);
          setBgToast("success");
          setToastMessage("Cantidad en stock modificada con exito");
          setShowToast(true);
        } else if (response.status === 404) {
          setBgToast("warning");
          setToastMessage(
            "Algo salio mal al intentar modificar cantidad del producto, intentalo de nuevo"
          );
        }
      } catch (error) {
        console.error(
          "Error al actualizar la información del producto en inventario:",
          error
        );

        const status = error.response.status || error.status;
        if (status === 401 || status === 403) {
          setBgToast("warning");
          setToastMessage("No tienes los permisos para esta operación");
          setShowToast(true);
          setShowModal(false);
        } else if (status === 500) {
          setBgToast("danger");
          setToastMessage(
            "Hubo un error al actualizar la cantidad de del producto, inténtelo de nuevo"
          );
          setShowToast(true);
          setShowModal(false);
        }
      }
    } else {
      setBgToast("danger");
      setToastMessage(
        "Hubo un error al modificar el stock del producto, intentelo de nuevo"
      );
      setShowToast(true);
    }
  };

  return (
    <>
      <Button
        variant="outline-primary"
        className="text-xs md:text-sm"
        onClick={() => setShowModal(true)}>
        Modificar Stock
      </Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-edit-inventary">
        <Modal.Header closeButton className="py-1 px-3">
          <Modal.Title className="text-lg pl-3 font-semibold">
            Modificar cantidad en inventario
          </Modal.Title>
        </Modal.Header>
        <hr className="text-slate-400" />
        <Modal.Body className="px-3 py-2">
          <p className="text-base text-wrap pl-1">
            En esta seccion podra modificar la cantidad en inventario del
            producto seleccionado.
          </p>
          <br />
          <p className="font-semibold pl-1">Ingrese la nueva cantidad:</p>
          <Form.Control
            className="mt-2 rounded-md border-slate-300 focus:outline-none shadow-none focus:border-slate-300"
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer className="flex border-none flex-col w-full px-3 gap-2">
          <Button
            variant="primary"
            className="w-full m-0"
            onClick={handleSaveChanges}>
            Guardar cambios
          </Button>
          <Button
            variant="secondary"
            className="w-full m-0"
            onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Editar;
