import axios from "axios";
import API_HOST from "@/config/config";

export const notificaciones = async () => {
  try {
    const response = await axios.get(`${API_HOST}/api/notifications-admin`);
    return response.data;
  } catch (error) {
    console.log("Error al listar las notificaciones", error);
  }
};
