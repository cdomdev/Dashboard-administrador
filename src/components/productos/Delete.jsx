import { getDataStorage } from "../../utils/getDataStorage";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
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
      className="text-sm uppercase py-2"
      variant="danger"
      onClick={() => borrarProducto()}>
      Eliminar produto
    </Button>
  );
};

export const ModalDelete = ({
  setListado,
  id,
  setBgToast,
  setShowToast,
  setToastMessage, producto }) => {

  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <Button variant="danger" className="text-sm uppercase" onClick={() => setShowModal(true)}>
        Eliminar produto
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} className="font-text-cust-2">
        <Modal.Header closeButton className="py-2 px-4">
          <Modal.Title className="font-bold text-lg text-red-600 ">
            Eliminar un producto
          </Modal.Title>
        </Modal.Header>
        <hr className="text-slate-300" />
        <Modal.Body className="py-4 px-3 ">
          <p className="text-sm md:text-base pt-2 pb-4 text-balance">Esta seguro de querer eliminar el producto: <strong>{producto.nombre}</strong></p>
          <div className="flex flex-col w-full gap-2 ">
            <Delete id={id}
              setListado={setListado}
              setBgToast={setBgToast}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage} />
            <Button variant="secondary" className="uppercase text-sm py-2" onClick={() => setShowModal(false)}>Cancelar</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Delete;
