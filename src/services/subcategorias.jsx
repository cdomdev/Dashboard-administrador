import axios from "axios";
import { api } from "@/config/axios.conf";
import API_HOST from "@/config/config";

export const createSubcategory = async (nombre) => {
  try {
    const response = await api.post(
      `${API_HOST}/api/subcategories/create`,
      nombre
    );
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const listarSub = async () => {
  try {
    const response = await axios.get(
      `${API_HOST}/api/subcategories/list`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteSubcategory = async (id) => {
  try {
    const response = await api.delete(
      `${API_HOST}/api/subcategories/delete/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
