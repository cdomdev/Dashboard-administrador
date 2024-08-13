import { useState } from "react";
import { Popover, Form, Button, Overlay } from "react-bootstrap";

export const PopoverProductos = ({
  listaProductos,
  handleProductSelection,
  selectedProducts,
}) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleListoClick = () => {
    setShow(false);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Button variant="secondary" onClick={handleClick}>
          Seleccionar productos para la oferta
        </Button>
        {selectedProducts !== null > 0 && (
          <span className="text-base font-semibold">
            Productos seleccionados: {selectedProducts.length}
          </span>
        )}
      </div>
      <Overlay
        show={show}
        target={target}
        placement="top-start"
        containerPadding={20}>
        <Popover id="popover-contained">
          <Popover.Header as="h3">Productos</Popover.Header>
          <Popover.Body className="overflow-y-auto max-h-80">
            {Array.isArray(listaProductos) &&
              listaProductos.map((producto) => (
                <div key={producto.id} className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id={`producto-${producto.id}`}
                    label={`${producto.marca} - ${producto.nombre} - ${producto.Inventarios[0].cantidad} Unidades`}
                    onChange={(e) => handleProductSelection(e, producto.id)}
                  />
                </div>
              ))}
            <Button onClick={handleListoClick}>Guardar</Button>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};
