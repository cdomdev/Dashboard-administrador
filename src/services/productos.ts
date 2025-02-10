import axios from "axios";
import { api } from "@/config/axios.conf";
import { API_HOST } from "../config/config";
import type { Producto } from "@/types/types";


interface UploadResponse {
  url: string;
  public_id: string;
}

interface UploadError {
  response?: {
    data?: any;
  };
  message: string;
}

export const saveImage = async (formData: FormData): Promise<UploadResponse> => {
  try {
    const response = await axios.post<UploadResponse>(
      `${API_HOST}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    const err = error as UploadError;
    console.log(
      "Error al guardar la imagen",
      err.response?.data || err.message
    );
    throw err;
  }
};


export const saveProducts = async (updatedList: Producto) => {
  try {
    const response = await api.post(`${API_HOST}/api/save-news-products`, {
      productos: updatedList
    }, { withCredentials: true });

    return response;
  } catch (error) {
    console.log("Error en el proceso de guardado de productos", error);
  }
};
