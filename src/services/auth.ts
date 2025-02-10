import axios from "axios"
import type { ValuesSesion } from "@/types/types";
import { API_HOST } from "@/config/config";


export const authAdmin = async (values: ValuesSesion) => {
    try {
        const response = await axios.post(`${API_HOST}/api/auth-admin`, values, {
            withCredentials: true
        });
        return response
    } catch (error) {
        throw error
    }
}


export const logout = async () => {
    try {
        const response = await axios.post(`${API_HOST}/api/logout`);
        return response
    } catch (error) {
        throw error
    }
}