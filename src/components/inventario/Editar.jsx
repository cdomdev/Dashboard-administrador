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
  const [isLoading, setIsLoading] = useState(false);

  const handleToast = (bgName, message) => {
    setBgToast(bgName);
    setToastMessage(message);
    setShowToast(true);
    setIsLoading(false);
    setShowModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedStock = parseInt(newStock);
      const response = await stockUpdate(updatedStock, producto.id);
      if (response && response.status === 200) {
        setProductos(response.data.inventaryUpdate);
        handleToast("success", "Cantidad en stock modificada con exito");
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
          "Hubo un error al actualizar la cantidad de del producto, inténtelo de nuevo"
        );
      }
    } finally {
      setIsLoading(false);
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
        className="font-text-cust-2">
        <Modal.Header closeButton className="py-1 px-3">
          <Modal.Title className="text-lg pl-3 font-semibold">
            Modificar stock
          </Modal.Title>
        </Modal.Header>
        <hr className="text-slate-400" />
        <Modal.Body className="px-3 py-2">
          <p className="text-wrap pl-1 text-sm">
            En esta seccion podra modificar la cantidad en inventario del
            producto seleccionado.
          </p>
          <br />
          <p className="font-semibold pl-1 mb-2 text-sm">
            Ingrese la nueva cantidad:
          </p>
          <Form.Control
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer className="flex border-none flex-col w-full px-3 gap-2">
          <Button
            variant="primary"
            className="w-full m-0 uppercase text-sm py-2"
            onClick={handleSaveChanges}>
            {isLoading ? "Guardando" : "Guadar Cambios"}
          </Button>
          <Button
            variant="secondary"
            className="w-full m-0 uppercase text-sm py-2"
            onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Editar;
