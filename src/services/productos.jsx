import axios from "axios";

export const saveImage = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(
      "Error al guardar la imagen",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
