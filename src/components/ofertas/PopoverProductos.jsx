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
          <Popover.Header as="h3" className="text-center">
            Productos
          </Popover.Header>
          <Popover.Body className="overflow-y-auto max-h-80">
            {!listaProductos ? (
              <div className="w-full py-2 flex px-1">
                <p>No hay productos</p>
              </div>
            ) : (
              Array.isArray(listaProductos) &&
              listaProductos.map((producto) => (
                <div key={producto.id} className="mb-3">
                  <Form.Check
                    type="checkbox"
                    className=" flex items-center gap-1"
                    id={`producto-${producto.id}`}
                    label={` ${producto.nombre} - ${producto.Inventarios[0].cantidad} Unidades`}
                    onChange={(e) => handleProductSelection(e, producto.id)}
                  />
                </div>
              ))
            )}

            <Button onClick={handleListoClick} className="w-full mt-1">
              Guardar
            </Button>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};
