import axios from "axios";
import { api } from "@/config/axios.conf";
import { API_HOST } from "@/config/config";

export const createSubcategory = async (nombre: string) => {
  try {
    const response = await api.post(
      `${API_HOST}/api/subcategories/create`,
      nombre,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const listarSub = async () => {
  try {
    const response = await axios.get(`${API_HOST}/api/subcategories/list`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteSubcategory = async (id: number) => {
  try {
    const response = await api.delete(
      `${API_HOST}/api/subcategories/delete/${id} `,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
