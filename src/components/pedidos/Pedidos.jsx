import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { orderUser } from "../../services/pedidos";

export const Pedidos = ({ user, ruta }) => {
  const [isLoading, setIsLoading] = useState(false);

  const viewOrders = async () => {
    setIsLoading(true);
    try {
      const response = await orderUser(user.id, ruta);
      if (response.status === 200) {
        const ordersUser = response.data.pedidos;
        window.location.href = "/Detalles";
        localStorage.setItem("dataOrderUser", JSON.stringify(ordersUser));
        localStorage.setItem("dataUser", JSON.stringify(user));
      }
    } catch (e) {
      console.log("Error al listar el pedido", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="btn-orders" onClick={viewOrders}>
      {isLoading ? (
        <div className="spinner-container  ">
          <Spinner animation="border" role="status" size="sm" />
        </div>
      ) : (
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-shopping-bag-exclamation w-6 h-6"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 21h-6.426a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304h11.339a2 2 0 0 1 1.977 2.304l-.258 1.678" />
            <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
            <path d="M19 16v3" />
            <path d="M19 22v.01" />
          </svg>{" "}
          Ver pedidos
        </span>
      )}
    </button>
  );
};
