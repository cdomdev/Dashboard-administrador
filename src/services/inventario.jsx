import axios from "axios";

export const productos = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/inventary/list-products"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
