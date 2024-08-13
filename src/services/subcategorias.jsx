import axios from "axios";

export const createSubcategory = async (nombre) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/subcategories/create",
      { nombre }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export const listarSub = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/subcategories/list"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const deleteSubcategory = async (id) => {
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
