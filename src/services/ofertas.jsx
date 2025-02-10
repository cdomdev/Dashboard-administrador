import { api } from "@/config/axios.conf";
import axios from "axios";
import { API_HOST } from "../config/config";


export const listar = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/listar/ofertas`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const productosPopover = async () => {
  try {
    const response = await axios.get(`${API_HOST}/api/productos`);
    return response.data;
  } catch (error) {
    console.error("Error al listar los productos en el popover", error);
  }
};

export const createOfert = async (data) => {
  try {
    const response = await api.post(`${API_HOST}/api/crear/ofertas`, data, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error al crear la oferta", error);
    throw error;
  }
};

export const updateOfert = async (id, values) => {
  try {
    const response = await api.put(`${API_HOST}/api/oferta/update/${id}`, {
      updatedValues: values,
    }, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error al actualizar la oferta", error);
    throw error;
  }
};

export const deleteOfert = async (id) => {
  try {
    const response = await api.delete(`${API_HOST}/api/oferta/delete/${id}`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error al eliminar la oferta", error);
    throw error;
  }
};
