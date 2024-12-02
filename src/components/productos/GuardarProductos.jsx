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
        image: producto.image,
      }));

      const response = await saveProducts(updatedList);

      if (response && response.status === 200) {
        setBgToast("success");
        setShowToast(true);
        setToastMessage("Los productos se guardaron con exito");
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
          className="w-full py-3 text-base flex items-center gap-1 justify-center"
          onClick={handleGuardarProducto}
        >
          {isLoading ? (
            <>Guardando productos...</>
          ) : (
            <>
              Guardar productos en la base de datos{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24"
                height="24"
                strokeWidth="2"
              >
                <path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3"></path>
                <path d="M4 6v6c0 1.657 3.582 3 8 3c1.075 0 2.1 -.08 3.037 -.224"></path>
                <path d="M20 12v-6"></path>
                <path d="M4 12v6c0 1.657 3.582 3 8 3c.166 0 .331 -.002 .495 -.006"></path>
                <path d="M16 19h6"></path>
                <path d="M19 16v6"></path>
              </svg>
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default GuardarProductos;
