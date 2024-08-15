import axios from "axios";
import API_HOST from "../config/config";

export const productos = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/inventary/list-products"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const stockUpdate = async (updatedStock, id) => {
  try {
    const response = await axios.put(
      `${API_HOST}/api/inventary/products/update-stock/${id}`,
      {
        newStock: updatedStock,
      }
    );
    return response;
  } catch (error) {
    console.log("Error en la actulzacion del stock");
  }
};

export const updateDataProduct = async (value, id) => {
  try {
    const response = await axios.put(
      `${API_HOST}/api/inventary/products/update/${id}`,
      {
        newProduct: value,
      }
    );
    return response;
  } catch (e) {
    console.log(
      "Error al actualizar la informacion del producto en inventario",
      e
    );
  }
};

export const deleteDataInventary = async (id) => {
  try {
    const response = await axios.delete(
      `${API_HOST}/api/inventary/products/delete/${id}`
    );
    return response;
  } catch (error) {
    console.log("Error al intentar eliminar un producto de inventario", error);
  }
};
