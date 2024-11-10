import API_HOST from "../config/config";
import { api } from "@/config/axios.conf";
import { error } from "node_modules/astro/dist/core/logger/core";

export const listar = async () => {
  try {
    const response = await api.get(
      `${API_HOST}/api/listar/usuarios-con-pedidos`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateState = async (id, estado, user) => {
  try {
    const response = await api.post(
      `${API_HOST}/api/update/state-orders/${id}`,
      {
        estado: estado,
        user: user,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const orderUser = async (id, ruta) => {
  try {
    const response = await api.get(`${API_HOST}/api/listar/${ruta}/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (e) {
    console.log(e);
    throw error;
  }
};
