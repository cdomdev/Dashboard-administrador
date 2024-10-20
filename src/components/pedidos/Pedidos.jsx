import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { orderUser } from "../../services/pedidos";
import { ToastCammon } from "../ToastCammon";


export const Pedidos = ({ user, ruta }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [bgToast, setBgToast] = useState("");

  const viewOrders = async () => {
    setIsLoading(true);
    try {
      const response = await orderUser(user.id, ruta);
      localStorage.setItem('data', JSON.stringify(response.data))
      if (response && response.status === 200) {
        const ordersUser = response.data.pedidos;
        window.location.href = `/detalles-pedido/${user.id}`;
        localStorage.setItem("dataOrderUser", JSON.stringify(ordersUser));
        localStorage.setItem("dataUser", JSON.stringify(user));
      }
    } catch (e) {
      console.log("Error al listar el pedido", e);
      setBgToast("danger");
      setToastMessage("Hubo un error al intenar listar los pedidod del usuario");
      setShowToast(true);
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastCammon
        bgToast={bgToast}
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
      />
      <button className="btn-orders" onClick={viewOrders}>
        {isLoading ? (
          <div className="spinner-container  ">
            <Spinner animation="border" role="status" size="sm" />
          </div>
        ) : (
          <span className="flex items-center gap-1">
            Ver pedidos
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clipboard-list size-6" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
              <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              <path d="M9 12l.01 0" />
              <path d="M13 12l2 0" />
              <path d="M9 16l.01 0" />
              <path d="M13 16l2 0" />
            </svg>
          </span>
        )}
      </button>
    </>
  );
};
