import API_HOST from "../config/config";
import { api } from "@/config/axios.conf";

export const balances = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/see-balance-sheets`);
    return response;
  } catch (error) {
    console.log("Error en el listado de la data para el dashboard", error);
  }
};

export const ventas = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/sales-month`);
    return response;
  } catch (error) {
    console.log("Error en el lisatdo de ventas", error);
  }
};

export const bestSaller = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/see-best-sallers`);
    return response;
  } catch (error) {
    console.error("Error al listar los mas vendidos");
  }
};
