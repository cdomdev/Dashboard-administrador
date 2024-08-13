import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import API_HOST from "../../config/config";
import { Exclamation } from "../icons/exclamation";

const Eliminar = ({ oferta, setOferta }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function handleDeleteOferta() {
    axios
      .delete(`${API_HOST}/api/oferta/delete/${oferta.id}`, {
        data: { id: oferta.id },
      })
      .then((response) => {
        if (response.status === 200) {
          setOferta(response.data.ofertas);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
        } else {
        }
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      });
  }

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Eliminar
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Title className="text-center text-lg text-red-700 py-1">
          Esta a punto de eliminar una oferta
        </Modal.Title>
        <hr />
        <div className="flex flex-col items-center justify-center px-2 py-3">
          <Exclamation />
          <p className="text-wrap text-sm">
            Esta seguro de querer elminar la oferta de:{" "}
            <strong className="t">{oferta.nombre}</strong>{" "}
          </p>
        </div>
        <div className="bg-red-50 flex flex-col px-3 gap-2 mb-3">
          <Button variant="danger" onClick={handleDeleteOferta}>
            Eliminar oferta
          </Button>
          <Button
            onClick={handleClose}
            variant="light"
            className="delete bg-gray-400">
            Cancelar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Eliminar;
