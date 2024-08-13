import axios from "axios";

const listarSub = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/subcategories/list"
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default listarSub;
