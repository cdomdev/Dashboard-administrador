import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
// import { api } from "../../config/axios.conf";
import API_HOST from "../../config/config";
import axios from "axios";

const GuardarProductos = ({ listadoState, setListadoState }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGuardarProducto = async () => {
    try {
      setIsLoading(true);
      if (!listadoState || listadoState.length === 0) {
        alert("mal");
        return;
      }
      const updatedList = listadoState.map((producto) => ({
        ...producto,
        displayImages: undefined,
        image: producto.image,
      }));

      const response = await axios.post(`${API_HOST}/api/save-news-products`, {
        productos: updatedList,
      });

      if (response.status === 200) {
        console.log("guardado");
        setListadoState([]);
        localStorage.removeItem("productos");
      } else {
        console.log("No guardado");
      }
    } catch (error) {
      if (error.response.status === 403) {
        console.log("Sin permisos");
      } else if (error.response.status === 500) {
        console.log("servidor mal");
      }

      console.error("Error al guardar el producto:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bottom-7 right-10 p-2  w-96 fixed">
        <Button
          variant="success"
          className="w-full py-2 text-lg"
          onClick={handleGuardarProducto}>
          {isLoading ? (
            <div className="spinner-container">
              <p>Guardando productos</p>
              <Spinner animation="border" role="status" size="sm" />
            </div>
          ) : (
            <>Guardar productos en la base de datos</>
          )}
        </Button>
      </div>
    </>
  );
};

export default GuardarProductos;
