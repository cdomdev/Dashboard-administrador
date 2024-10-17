import { api } from "@/config/axios.conf";
import axios from "axios";
import API_HOST from "@/config/config";

export const createCategory = async (nombre) => {
  try {
    const response = await api.post(
      `${API_HOST}/api/categories/create`,
      nombre, { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const listarCat = async () => {
  try {
    const response = await axios.get(
      `${API_HOST}/api/categories/list`
    );
    if (response.data && response.data.categorias) {
      return response.data.categorias;
    } else {
      console.error(
        "Categorías no encontradas en la respuesta:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching categorias:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`${API_HOST}/api/categories/delete/${id}`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
