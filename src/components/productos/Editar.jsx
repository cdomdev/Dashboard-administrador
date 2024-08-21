import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getDataStorage } from "../../utils/getDataStorage";

const Editar = ({
  producto,
  setListado,
  setBgToast,
  setToastMessage,
  setShowToast,
}) => {
  const [showModal, setShowModal] = useState(false);

  const guardarEdicion = async (e, id) => {
    e.preventDefault();

    const target = e.target;
    const productosAlmacenados = getDataStorage("productos");
    const indice = productosAlmacenados
      ? productosAlmacenados.findIndex((p) => p.id === id)
      : -1;

    let productoActualizado = {
      id,
      marca: target.titulo.value || producto.marca,
      valor: parseInt(target.valor.value).toFixed(2) || producto.valor,
      nombre: target.nombre.value || producto.nombre,
      description: target.descripcion.value || producto.description,
      cantidad: target.cantidad.value || producto.cantidad,
      image: producto.image,
      referencia: target.referencia.value || producto.referencia,
      categoria: producto.categoria,
      categoria_id: producto.categoria_id,
      subcategoria: producto.subcategoria,
      subcategoria_id: producto.subcategoria_id,
    };

    productosAlmacenados[indice] = productoActualizado;
    localStorage.setItem("productos", JSON.stringify(productosAlmacenados));
    setListado((prevListado) =>
      prevListado.map((item) =>
        item.id === productoActualizado.id ? productoActualizado : item
      )
    );
    if (productoActualizado) {
      setToastMessage("Producto actulizado");
      setBgToast("success");
      setShowToast(true);
      setShowModal(false);
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        Editar
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="py-2 px-4">
          <Modal.Title className="font-bold text-lg">
            Editar Producto
          </Modal.Title>
        </Modal.Header>
        <hr className="text-slate-300" />
        <Modal.Body className="p-4">
          <Form.Label className="my-1 pl-1">
            Cambiar marca del producto
          </Form.Label>
          <Form onSubmit={(e) => guardarEdicion(e, producto.id)}>
            <Form.Control
              type="text"
              name="titulo"
              className="border-gray-300 rounded-md focus:outline-none shadow-none focus:border-slate-300"
              defaultValue={producto.marca}
            />
            <Form.Label className="my-1 pl-1">
              Cambiar nombre del producto
            </Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              className="border-gray-300 rounded-md focus:outline-none shadow-none focus:border-slate-300"
              defaultValue={producto.nombre}
            />
            <Form.Label className="my-1 pl-1">
              Cambiar valor del producto
            </Form.Label>
            <Form.Control
              placeholder="Actualizar precio"
              name="valor"
              defaultValue={producto.valor}
              className="border-gray-300 rounded-md focus:outline-none shadow-none focus:border-slate-300 py-2"
            />
            <Form.Label className="my-1 pl-1">
              Cambiar catidad del producto
            </Form.Label>
            <Form.Control
              placeholder="Actualizar cantidad"
              name="cantidad"
              defaultValue={producto.cantidad}
              className="border-gray-300 rounded-md focus:outline-none shadow-none focus:border-slate-300 py-2"
            />
            <Form.Label className="my-1 pl-1">
              Cambiar referencia del producto
            </Form.Label>
            <Form.Control
              placeholder="Actualizar referencia"
              name="referencia"
              defaultValue={producto.referencia}
              className="border-gray-300 rounded-md focus:outline-none shadow-none focus:border-slate-300 py-2"
            />
            <Form.Label className="my-1 pl-1">
              Cambiar descripcion del producto
            </Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              defaultValue={producto.description}
              className="border-gray-300 rounded-md focus:outline-none shadow-none focus:border-slate-300"
            />

            <span className="w-full">
              <Button type="submit" className="w-full mt-3 text-lg">
                Guardar
              </Button>
            </span>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Editar;
