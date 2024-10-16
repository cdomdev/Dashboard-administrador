import API_HOST from "@/config/config";
import { api } from "@/config/axios.conf";

export const getUserForList = async () => {
    try {
        const response = await api.get(
            `${API_HOST}/api/users`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
