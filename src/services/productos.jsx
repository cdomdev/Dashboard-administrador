import axios from "axios";

const data = async () => {
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

export default data;
