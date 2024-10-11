import axios from "axios"
import API_HOST from "@/config/config"
import type { ValuesSesion } from "@/types/types";

console.log('host de la api -->', API_HOST)
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