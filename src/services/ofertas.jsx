import API_HOST from "@/config/config";
import axios from "axios";

export const listar = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/listar/ofertas"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const productosPopover = async () => {
  try {
    const response = await axios.get(`${API_HOST}/api/productos`);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al listar los productos en el popover", error);
  }
};

export const createOfert = async (data) => {
  try {
    const response = await axios.post(
      `${API_HOST}/api/crear/ofertas`,
      data
    );
    return response.data
  } catch (error) {
    console.error("Error al crear la oferta", error);
  }
}



export const updateOfert = async (id) => {
  try {
    const response = await axios.put(`${API_HOST}/api/oferta/update/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al actualizar la oferta", error);
  }
}

export const deleteOfert = async(id) =>{
  try {
    const response = await axios.delete(`${API_HOST}/api/oferta/delete/${id}`);
    if (response.status === 200) {
    return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al eliminar la oferta", error);
  }
}
