import axios from "axios";

const listarCat = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/categories/list"
    );
    if (response.data && response.data.categorias) {
      console.log(response.data.categorias);
      return response.data.categorias;
    } else {
      console.error(
        "Categorías no encontradas en la respuesta:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching categorias:", error);
    throw error;
  }
};

export default listarCat;
