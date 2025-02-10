import { api } from "@/config/axios.conf";
import { API_HOST } from "../config/config";

export const balances = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/see-balance-sheets`, { withCredentials: true });
    return response;
  } catch (error) {
    console.log("Error en el listado de la data para el dashboard", error);
    throw error
  }
};

export const ventas = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/sales-month`, { withCredentials: true });
    return response;
  } catch (error) {
    console.log("Error en el lisatdo de ventas", error);
    throw error
  }
};
export const bestSaller = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/see-best-sallers`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error al listar los mas vendidos");
    throw error
  }
};
