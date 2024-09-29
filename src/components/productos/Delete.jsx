import { getDataStorage } from "../../utils/getDataStorage";
import { Button } from "react-bootstrap";

const Delete = ({
  setListado,
  id,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const borrarProducto = () => {
    let productosAlmacenadas = getDataStorage("productos");
    let nuevoListadoProductos = productosAlmacenadas.filter(
      (producto) => producto.id !== id
    );
    setListado([...nuevoListadoProductos]);
    localStorage.removeItem(`productos${id}`);

    setToastMessage("Producto eliminado");
    setBgToast("success");
    setShowToast(true);

    if (nuevoListadoProductos.length === 0) {
      localStorage.removeItem("productos");
    } else {
      localStorage.setItem("productos", JSON.stringify(nuevoListadoProductos));
    }
  };
  return (
    <Button
      className="text-sm uppercase"
      variant="danger"
      onClick={() => borrarProducto()}>
      Borrar
    </Button>
  );
};

export default Delete;
