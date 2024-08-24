import API_HOST from "@/config/config";
import { api } from "@/config/axios.conf";

export const notificaciones = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/notifications-admin`);
    return response.data;
  } catch (error) {
    console.log("Error al listar las notificaciones", error);
  }
};
