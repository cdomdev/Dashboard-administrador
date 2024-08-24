import API_HOST from "@/config/config";
import axios from "axios";

export const deleteNotifications = async (id) => {
  try {
    const response = await axios.delete(
      `${API_HOST}/api/delete-nofitication/${id}`
    );
    return response;
  } catch (error) {
    console.log("Error al intentar eliminar una notificacion", error);
  }
};
