import axios from "axios";
import { api } from "@/config/axios.conf";

export const createSubcategory = async (nombre) => {
  try {
    const response = await api.post(
      "http://localhost:3000/api/subcategories/create",
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
      "http://localhost:3000/api/subcategories/list"
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
      `http://localhost:3000/api/subcategories/delete/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
