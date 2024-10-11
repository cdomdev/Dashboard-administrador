import axios from "axios";
import API_HOST from "../config/config";
import { api } from "@/config/axios.conf";

export const productos = async () => {
  try {
    const response = await axios.get(
      `${API_HOST}/list-products`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const stockUpdate = async (updatedStock, id) => {
  try {
    const response = await api.put(
      `${API_HOST}/api/inventary/products/update-stock/${id}`,
      {
        newStock: updatedStock,
      }
    );
    return response;
  } catch (error) {
    console.log("Error en la actulzacion del stock");
    throw error;
  }
};

export const updateDataProduct = async (value, id) => {
  try {
    const response = await api.put(
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
    throw e;
  }
};

export const deleteDataInventary = async (id) => {
  try {
    const response = await api.delete(
      `${API_HOST}/api/inventary/products/delete/${id}`
    );
    return response;
  } catch (error) {
    console.log("Error al intentar eliminar un producto de inventario", error);
    throw error;
  }
};
