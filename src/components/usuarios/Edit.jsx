import { modifedStateUser } from "@/services/users";
import { EditIcon } from "../icons/Edit";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ToastCammon } from "../ToastCammon";

export const Edit = ({ user, setUsers }) => {
  const [show, setShow] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [bgToast, setBgToast] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleToast = (bgName, message) => {
    setBgToast(bgName);
    setToastMessage(message);
    setShow(false);
    setIsloading(false);
    setShowToast(true);
  };

  const handleStateChange = async () => {
    setIsloading(true);
    try {
      const response = await modifedStateUser(user.id, selectedState);
      if (response.status === 200) {
        const { users } = response.data;
        setUsers(users);
        handleToast("success", "Estado del usuario actulizado con exito");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        console.log(status);
        if (status === 401 || status === 403) {
          handleToast("warning", "No tienes los permisos para esta operación");
        } else {
          handleToast(
            "danger",
            "HUbo un error al proceder con la solicitud, por favorm intentalo mas tarde"
          );
        }
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className="bg-transparent border-none text-black flex items- text-xs md:text-sm gap-1 capitalize"
      >
        {user.estado ? user.estado : "Activo"}
        <EditIcon />
      </Button>
      <ToastCammon
        bgToast={bgToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
        showToast={showToast}
      />
      <Modal show={show} onHide={handleClose} className="font-text-cust-2">
        <Modal.Header closeButton className="py-1">
          <Modal.Title className="text-lg font-semibold">
            Modificar estado del usuario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-b-0 ">
          {(user && user.roles?.rol_name === "usuario") ||
          user.roles?.rol_name === "admin" ? (
            <>
              <p className="text-base mb-2">
                El estado actual del usuario:{" "}
                <strong>{user.estado || "Activo"}</strong>
              </p>
              <div className="flex items-center gap-1 flex-col">
                <p>Seleccionar el nuvo estado para el usuario</p>
                <form
                  action="submit"
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <select className="rounded-md pl-4 py-1 border-slate-200 ring-0 hover:ring-blue-500 focus:ring-blue-200 focus:border-blue-200">
                    <option>Seleccione un nuevo estado</option>
                    <option id="activo">Activo</option>
                    <option id="bloqueado">Bloqueado</option>
                  </select>
                </form>
              </div>
            </>
          ) : (
            <p>
              La opcion de modificar el estado solo esta disponible para
              aquellos cuyo rol sea diferente a invitado
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="border-t-0">
          <div className="flex flex-col w-full gap-2">
            {user.roles?.rol_name == "usuario" ? (
              <Button variant="primary" onClick={handleStateChange}>
                {isLoading ? "Actualizando..." : "Actulizar estado "}
              </Button>
            ) : (
              <Button
                onClick={handleClose}
                className={`${user.roles?.rol_name !== "usuario" ? "hidden" : "block"} `}
              >
                No disponible
              </Button>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
