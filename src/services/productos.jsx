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


const saveImage = async(data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/upload", {data}
    );
    return response.data;
  } catch (error) {
    console.log('Error al guaradr la imagen', error)
  }
}

export default {
  data, saveImage
}
