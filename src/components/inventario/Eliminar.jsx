import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { Exclamation } from "../icons/Exclamation";
import { deleteDataInventary } from "../../services/inventario";

const Eliminar = ({
  producto,
  setData,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToast = (bgName, message) => {
    setBgToast(bgName);
    setShowToast(true);
    setToastMessage(message);
    setIsLoading(false);
    setShowModal(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await deleteDataInventary(producto.id);
      if (response && response.status === 200) {
        setData(response.data.daleteUpdate);
        handleToast("success", "Producto eliminado con exito");
      }
    } catch (error) {
      const status = error.response.status || error.status;
      if (status === 401 || status === 403) {
        handleToast("warning", "No tienes los permisos para esta operación");
      } else if (status === 500) {
        handleToast(
          "warning",
          "Hubo un error al intentar eliminar el producto, inténtelo de nuevo"
        );
      }
      handleToast(
        "warning",
        "Hubo un error inesperado al intentar eliminar un producto, intentalo mas tarde"
      );
    }
  };

  return (
    <>
      <Button
        variant="outline-danger"
        className="text-xs md:text-sm"
        onClick={() => setShowModal(true)}>
        Eliminar
      </Button>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        className="font-text-cust-2">
        <Modal.Header className="py-1 px-3 flex justify-center">
          <Modal.Title className="text-center text-lg  text-red-700">
            ¡Esta apunto de eliminar un producto!
          </Modal.Title>
        </Modal.Header>
        <hr />
        <Modal.Body className="px-4 py-2 flex flex-col">
          <Exclamation />
          <span className="text-red-600 text-[12px] text-center font-semibold">
            Se eliminara la cantidad total de inventario.
          </span>
          <p className="text-sm pt-2 ">
            !Esta seguro de querer eliminar el producto
            <strong> {producto?.nombre}.</strong> En inventario tiene
            <strong> {producto?.Inventarios[0].cantidad} productos</strong>!
          </p>
        </Modal.Body>
        <Modal.Footer className="flex text-sm  flex-col border-none w-full gap-1">
          <Button
            variant="danger"
            onClick={handleDelete}
            className="w-full py-2 uppercase text-sm">
            {isLoading ? "Eliminado..." : "Eliminar producto"}
          </Button>
          <Button
            variant="light"
            className="delete w-full text-sm uppercase py-2  bg-gray-400 border-none"
            onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Eliminar;
