import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { orderUser } from "../../services/pedidos";

const OrdenPorUsuario = ({ user, url }) => {
  const [isLoading, setIsLoading] = useState(false);

  const viewOrders = async () => {
    setIsLoading(true);
    try {
      const response = await orderUser(url, user.id);
      if (response.status === 200) {
        const ordersUser = response.data.pedidos;
        localStorage.setItem("dataOrdersUser", JSON.stringify(ordersUser));
        localStorage.setItem("dataUserOrders", JSON.stringify(user));
      }
    } catch (e) {
      console.log("Error al listar el pedido", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={viewOrders} className="btn-orders">
      {isLoading ? (
        <div className="spinner-container  ">
          <Spinner animation="border" role="status" size="sm" />
        </div>
      ) : (
        <>
          {" "}
          Tiene pedidos <BsBox2 className="icon-box mx-2" />
        </>
      )}
    </button>
  );
};

export default OrdenPorUsuario;
