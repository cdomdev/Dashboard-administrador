import API_HOST from "@/config/config";
import { api } from "@/config/axios.conf";


export const notificaciones = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/notifications-admin`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error al listar las notificaciones", error);
  }
};


export const deleteNotifications = async (id) => {
  try {
    const response = await api.delete(
      `${API_HOST}/api/delete-nofitication/${id}`, { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log("Error al intentar eliminar una notificacion", error);
  }
};


export const marcarTodas = async () => {
  try {
    const response = await api.put(`${API_HOST}/api/tick-readAll`, { withCredentials: true });
    return response
  } catch (error) {
    console.log("Error al intentar marcar como leidas las notificaciones", error);
    throw error
  }
}