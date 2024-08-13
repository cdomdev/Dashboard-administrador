import API_HOST from "@/config/config";
import axios from "axios";

export const listar = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/listar/ofertas"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const productosPopover = async () => {
  try {
    const response = await axios.get(`${API_HOST}/api/productos`);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al listar los productos en el popover", error);
  }
};
