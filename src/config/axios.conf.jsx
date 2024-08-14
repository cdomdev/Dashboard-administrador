import { getDataStorage } from "../utils/getDataStorage";
import API_HOST from "./config";
import axios from "axios";

// Configuración para solicitudes de administrador - enviar credenciales
axios.defaults.withCredentials = true;
export const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar un interceptor para incluir el token en cada solicitud
api.interceptors.request.use(
  (config) => {
    let tokenAdmin;
    const tokenAdminRoleAdmin = localStorage.getItem("HttpOnlyAdmin");
    const role = getDataStorage("userOnValidateScesOnline");
    if (role.role === "admin") {
      tokenAdmin = tokenAdminRoleAdmin;
    } else {
      tokenAdmin = role.accessToken;
    }
    if (tokenAdmin) {
      config.headers.Authorization = `Bearer ${tokenAdmin}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Añadir un interceptor de respuesta para manejar la renovación del token
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Intentar renovar el access token
        const refreshResponse = await axios.post(
          `${API_HOST}/refresh-token`,
          {},
          { withCredentials: true }
        );

        if (refreshResponse.status === 200) {
          const { accessToken } = refreshResponse.data;
          localStorage.setItem("HttpOnlyAdmin", accessToken);

          // Actualizar el header de Authorization del request original
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } else {
          console.log("No se pudo renovar el token");
        }
      } catch (error) {
        console.error("Error al renovar el access token:", error);
      }
    }

    return Promise.reject(error);
  }
);
