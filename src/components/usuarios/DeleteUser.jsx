import { Modal, Button } from "react-bootstrap";
import { ToastCammon } from "../ToastCammon";
import { useState } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { deleteUser } from "@/services/users";

export const DeleteUser = ({
  user,
  setUsers,
  setShowToast,
  setToastMessage,
  setBgToast,
}) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleToast = (bgName, message) => {
    setIsloading(false);
    setShow(false);
    setShowToast(true);
    setToastMessage(message);
    setBgToast(bgName);
  };

  const handleDeleteError = (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      handleToast("warning", "No tienes los permisos para esta operación");
    } else if (status === 404) {
      handleToast(
        "danger",
        "hubo un error al intentar elimiar le usuario, intentaleo de mas tarde"
      );
    } else {
      handleToast(
        "danger",
        "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  const handleDeleteUser = async () => {
    setIsloading(true);
    try {
      const response = await deleteUser(user.id);
      const { users } = response.data;
      if (response && response.status === 200) {
        handleToast("success", "Usuario eliminado con exito");
        setUsers(users);
      }
    } catch (error) {
      handleDeleteError(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <button onClick={handleShow}>
        <DeleteIcon />
      </button>

      <Modal show={show} onHide={handleClose} className="font-">
        <Modal.Header closeButton className="py-2">
          <Modal.Title className="text-base font-semibold flex items-center gap-2 text-red-600">
            ¡Seguro que desea eliminar al usuario{" "}
            <p className="text-black">{user.nombre} </p>!
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
