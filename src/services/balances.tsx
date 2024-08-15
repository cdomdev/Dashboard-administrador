import axios from "axios";
import API_HOST from "../config/config";

const balances = async () => {
  try {
    const response = await axios.get(`${API_HOST}/api/see-balance-sheets`);
    return response;
  } catch (error) {
    console.log("Error en el listado de la data para el dashboard", error);
  }
};

export default balances;
