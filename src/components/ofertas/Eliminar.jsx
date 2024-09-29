import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Exclamation } from "../icons/Exclamation";
import { deleteOfert } from "../../services/ofertas";

const Eliminar = ({
  oferta,
  setOfertas,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDeleteOferta = async () => {
    try {
      const response = await deleteOfert(oferta.id);
      if (response.status === 200) {
        setOfertas(response.data.ofertas);
        setShowModal(false);
        setBgToast("success");
        setShowToast(true);
        setToastMessage("Oferta eliminada con exito");
      } else {
        setBgToast("warning");
        setShowToast(true);
        setToastMessage("Algo salio mal, intentalo de neuvo");
      }
    } catch (error) {
      console.error("Error al intentar eliminar una oferta");
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          setBgToast("warning");
          setToastMessage("No tienes los permisos para esta operación");
          setShowToast(true);
          setShowModal(false);
        } else if (status === 500) {
          setBgToast("danger");
          setToastMessage(
            "Hubo un error intentar eliminar la oferta, inténtelo de nuevo"
          );
          setShowToast(true);
          setShowModal(false);
        } else {
          setBgToast("danger");
          setToastMessage(
            "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."
          );
          setShowToast(true);
        }
      }
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Eliminar
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="font-text-cust-2">
        <Modal.Title className="text-center text-lg py-1 text-red-700 py-1!">
          ¡ Esta a punto de eliminar una oferta !
        </Modal.Title>
        <hr />
        <div className="flex flex-col items-center justify-center px-2 py-3">
          <Exclamation />
          <p className="text-balance text-sm px-2 text-left">
            Esta seguro de querer elminar la oferta de:{" "}
            <strong className="text-sm">{oferta.nombre}</strong>{" "}
          </p>
        </div>
        <div className="bg-red-50 flex flex-col px-3 gap-2 mb-3">
          <Button variant="danger" onClick={handleDeleteOferta} className=" text-sm uppercase
           py-2">
            Eliminar oferta
          </Button>
          <Button
            onClick={handleClose}
            variant="light"
            className="delete text-sm uppercase
             py-2 bg-gray-400 border-none">
            Cancelar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Eliminar;
