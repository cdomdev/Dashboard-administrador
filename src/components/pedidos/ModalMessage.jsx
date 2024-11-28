import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import Chat from "./Chat";

export const ModalMessage = ({ usuario }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        className="flex flex-col relative w-16 bg-transparent text-black  border-none "
        onClick={() => setShowModal(true)}>
        <span className="size-2.5 bg-red-600 absolute rounded-full right-3 -top-2.1"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-message-dots ml-4 ">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 11v.01" />
          <path d="M8 11v.01" />
          <path d="M16 11v.01" />
          <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3z" />
        </svg>
      </Button>
      <Modal
        size="lg"
        backdrop="static"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="text-xl font-medium">
            Nuevo mensaje de {usuario?.nombre || "usuario"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Chat />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
