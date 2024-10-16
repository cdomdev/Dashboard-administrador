import axios from "axios";
import API_HOST from "../config/config";
import { api } from "@/config/axios.conf";

export const saveImage = async (formData) => {
  try {
    const response = await axios.post(
      `${API_HOST}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(
      "Error al guardar la imagen",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const saveProducts = async (updatedList) => {
  try {
    const response = await api.post(`${API_HOST}/api/save-news-products`, {
      productos: updatedList
    }, { withCredentials: true });

    return response;
  } catch (error) {
    console.log("Error en el proceso de guardado de productos", error);
  }
};
