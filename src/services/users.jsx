import API_HOST from "@/config/config";
import { api } from "@/config/axios.conf";

export const getUserForList = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/users`);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getAllsAdmin = async () => {
  try {
    const response = await api.get(`${API_HOST}/api/admins`);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const modifedStateUser = async (id, estado) => {
  try {
    const response = await api.post(
      `${API_HOST}/api/modifed-state-user/${id}`,
      { estado }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`${API_HOST}/api/delete-user/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteInvited = async (id) => {
  try {
    const response = await api.delete(`${API_HOST}/api/delete-invited/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
