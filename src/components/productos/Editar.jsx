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
      <Button variant="secondary" className="text-sm uppercase" onClick={() => setShowModal(true)}>
        Editar producto
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} className="font-">
        <Modal.Header closeButton className="py-2 px-4">
          <Modal.Title className="font-bold text-lg ">
            Editar Producto
          </Modal.Title>
        </Modal.Header>
        <hr className="text-slate-300" />
        <Modal.Body className="py-4 px-3 ">
          <Form.Label className="my-1 pl-1 text-sm">
            Cambiar marca del producto
          </Form.Label>
          <Form onSubmit={(e) => guardarEdicion(e, producto.id)}>
            <Form.Control
              type="text"
              name="titulo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              defaultValue={producto.marca}
            />
            <Form.Label className="my-1 pl-1 text-sm">
              Cambiar nombre del producto
            </Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              defaultValue={producto.nombre}
            />
            <Form.Label className="my-1 pl-1 text-sm">
              Cambiar valor del producto
            </Form.Label>
            <Form.Control
              placeholder="Actualizar precio"
              name="valor"
              defaultValue={producto.valor}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            <Form.Label className="my-1 pl-1 text-sm">
              Cambiar catidad del producto
            </Form.Label>
            <Form.Control
              placeholder="Actualizar cantidad"
              name="cantidad"
              defaultValue={producto.cantidad}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            <Form.Label className="my-1 pl-1 text-sm">
              Cambiar referencia del producto
            </Form.Label>
            <Form.Control
              placeholder="Actualizar referencia"
              name="referencia"
              defaultValue={producto.referencia}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            <Form.Label className="my-1 pl-1 text-sm">
              Cambiar descripcion del producto
            </Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              defaultValue={producto.description}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />

            <span className="w-full">
              <Button type="submit" className="w-full mt-3 py-2 text-sm uppercase">
                Guardar producto
              </Button>
            </span>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Editar;
