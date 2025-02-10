import axios from "axios";
import Cookies from 'js-cookie'

import { API_HOST } from "./config";

axios.defaults.withCredentials = true;
export const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const tokenSesion = Cookies.get("access_token");
    config.headers.Authorization = `Bearer ${tokenSesion}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
        const refreshResponse = await axios.post(
          `${API_HOST}/api/refresh-token-admin`,
          { withCredentials: true }
        );

        if (refreshResponse.status === 200) {
          const { newAccessToken } = refreshResponse.data;
          Cookies.set("access_token", newAccessToken, { secure: true, sameSite: "lax", expires: 7 });
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
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
