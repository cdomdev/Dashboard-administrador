import axios from "axios";

const listar = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/listar/usuarios-con-pedidos"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default listar;
