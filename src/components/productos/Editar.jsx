import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import getDataStorage from "../../utils/getDataStorage";

const Editar = ({ producto, setListadoState }) => {
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
    setListadoState((prevListado) =>
      prevListado.map((item) =>
        item.id === productoActualizado.id ? productoActualizado : item
      )
    );
    if (productoActualizado) {
      alert("Actulizado");
    }
  };

  return (
    <div className="edit-form">
      <Button
        variant="secondary"
        className="btn-custome"
        onClick={() => setShowModal(true)}>
        Editar
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-editar">
          <Form.Label>Cambiar marca del producto</Form.Label>
          <Form onSubmit={(e) => guardarEdicion(e, producto.id)}>
            <Form.Control
              type="text"
              name="titulo"
              className="titulo-editado "
              defaultValue={producto.marca}
            />
            <Form.Label>Cambiar nombre del producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              className="titulo-editado "
              defaultValue={producto.nombre}
            />
            <Form.Label>Cambiar valor del producto</Form.Label>
            <Form.Control
              placeholder="Actualizar precio"
              name="valor"
              defaultValue={producto.valor}
            />
            <Form.Label>Cambiar catidad del producto</Form.Label>
            <Form.Control
              placeholder="Actualizar cantidad"
              name="cantidad"
              defaultValue={producto.cantidad}
            />
            <Form.Label>Cambiar referencia del producto</Form.Label>
            <Form.Control
              placeholder="Actualizar referencia"
              name="referencia"
              defaultValue={producto.referencia}
            />
            <Form.Label>Cambiar descripcion del producto</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              defaultValue={producto.description}
              className="descripcion-editada "
            />

            <span className="content-btn-card">
              <Button type="submit" className="btn-custom mt-3">
                Guardar
              </Button>
            </span>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Editar;
