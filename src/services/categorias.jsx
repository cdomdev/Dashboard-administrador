import axios from "axios";

export const createCategory = async (nombre) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/categories/create",
      { nombre }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export const listarCat = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/categories/list"
    );
    if (response.data && response.data.categorias) {
      console.log(response.data.categorias);
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
    const response = await axios.delete(
      `http://localhost:3000/api/categories/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

