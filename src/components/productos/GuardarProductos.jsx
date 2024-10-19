import { useState } from "react";
import { Button } from "react-bootstrap";
import { saveProducts } from "../../services/productos";

const GuardarProductos = ({
  listadoState,
  setListadoState,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGuardarProducto = async () => {
    try {
      setIsLoading(true);
      const updatedList = listadoState.map((producto) => ({
        ...producto,
        displayImages: undefined,
        image: producto.image,
      }));

      const response = await saveProducts(updatedList);

      if (response && response.status === 200) {
        setBgToast("success");
        setShowToast(true);
        setToastMessage("Los productos se guardaroin con exito");
        setListadoState([]);
        localStorage.removeItem("productos");
      } else {
        setBgToast("danger");
        setShowToast(true);
        setToastMessage(
          "Algo salio mal al guardar los productos, intentelo de nuevo"
        );
      }
    } catch (error) {
      if (error.response.status === 403) {
        setBgToast("danger");
        setShowToast(true);
        setToastMessage("No tienes los permisos para esta operacion");
      } else if (error.response.status === 500) {
        setBgToast("danger");
        setShowToast(true);
        setToastMessage("Hubo un error en el servidor, intentelo de nuevo");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bottom-14 right-10 p-2  w-96 fixed">
        <Button
          variant="success"
          className="w-full py-3 text-base"
          onClick={handleGuardarProducto}>
          {isLoading ? <>Guardando productos...</> : <>Guardar productos en la base de datos</>}
        </Button>
      </div>
    </>
  );
};

export default GuardarProductos;
