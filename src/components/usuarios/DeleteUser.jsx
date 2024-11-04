import { Modal, Button } from "react-bootstrap";
import { ToastCammon } from "../ToastCammon";
import { useState } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { deleteInvited, deleteUser } from "@/services/users";

export const DeleteUser = ({ user, setUsers }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [bgToast, setBgToast] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteError = (error) => {
    const status = error.response?.status;
    setBgToast("warning");
    setIsloading(false);
    setShow(false);
    setShowToast(true);

    if (status === 401 || status === 403) {
      setToastMessage("No tienes los permisos para esta operación");
    } else if (status === 404) {
      setToastMessage(
        "hubo un error al intentar elimiar le usuario, intentaleo de mas tarde"
      );
    } else {
      setBgToast("danger");
      setToastMessage(
        "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  const handleDeleteUser = async () => {
    setIsloading(true);
    try {
      if (user?.roles?.rol_name === "usuario") {
        const response = await deleteUser(user.id);
        if (response.status === 200) {
          setBgToast("success");
          setShow(false);
          setIsloading(false);
          setShowToast(true);
          setToastMessage("Estado del usuario actualizado con éxito");
          setUsers(response.data.users);
        }
      } else {
        const response = await deleteInvited(user.id);
        if (response.status === 200) {
          setBgToast("success");
          setShow(false);
          setIsloading(false);
          setShowToast(true);
          setToastMessage("Estado del usuario actualizado con éxito");
          setUsers(response.data.users);
        }
      }
    } catch (error) {
      handleDeleteError(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <ToastCammon
        bgToast={bgToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
        showToast={showToast}
      />
      <button onClick={handleShow}>
        <DeleteIcon />
      </button>
      <Modal show={show} onHide={handleClose} className="font-text-cust-2">
        <Modal.Header closeButton className="py-1">
          <Modal.Title className="text-lg font-semibold text-red-600">
            ¡Seguro que desea eliminar al usuario {user.nombre}!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-b-0">
          <p className="text-base mb-2 text-balance ">
            Tenga en cuanta que se borraran todos los datos y registros
            relacionados al usuario <strong> {user.nombre} </strong>
          </p>
        </Modal.Body>
        <Modal.Footer className="border-t-0">
          <div className="flex flex-col w-full gap-2">
            <Button variant="danger" onClick={handleDeleteUser}>
              {isLoading ? "Eliminando..." : "Eliminar usuario "}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
