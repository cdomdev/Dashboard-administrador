import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Box } from "../icons/Box.jsx";
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
          <Box /> Ver pedidos
        </span>
      )}
    </button>
  );
};
