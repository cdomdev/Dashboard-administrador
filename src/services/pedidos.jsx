import axios from "axios";
import API_HOST from "../config/config";

const listar = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/listar/usuarios-con-pedidos"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default listar;

export const updateState = async (id, estado) => {
  try {
    const response = await axios.post(
      `${API_HOST}/api/update/state-orders/${id}`,
      {
        estado: estado,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const orderUser = async (id, url) => {
  try {
    const response = await axios.post(`${API_HOST}/api/listar/${url}/${id}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};
