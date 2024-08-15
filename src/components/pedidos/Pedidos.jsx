import { useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import API_HOST from "../../config/config";
// import Box from "../icons/Box.astro";

const Pedidos = ({ user, url }) => {
  const [isLoading, setIsLoading] = useState(false);

  const viewOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_HOST}/api/listar/${url}/${user.id}`
      );
      console.log(response.data);
      if (response.status === 200) {
        const ordersUser = response.data.pedidos;
        window.location.href = "/Detalles";
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
        <> Tiene pedidos</>
      )}
    </button>
  );
};

export default Pedidos;
