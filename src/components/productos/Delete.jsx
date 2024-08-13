import getDataStorage from "../../utils/getDataStorage";
import { Button } from "react-bootstrap";

const Delete = ({ setListadoState, id }) => {
  const borrarProducto = () => {
    let productosAlmacenadas = getDataStorage("productos");
    let nuevoListadoProductos = productosAlmacenadas.filter(
      (producto) => producto.id !== id
    );
    setListadoState([...nuevoListadoProductos]);
    localStorage.removeItem(`productos${id}`);
    alert("eliminado ");
    if (nuevoListadoProductos.length === 0) {
      localStorage.removeItem("productos");
    } else {
      localStorage.setItem("productos", JSON.stringify(nuevoListadoProductos));
    }
  };
  return (
    <Button
      className="btn-custom"
      variant="danger"
      onClick={() => borrarProducto()}>
      Borrar
    </Button>
  );
};

export default Delete;
