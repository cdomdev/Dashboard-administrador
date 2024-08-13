import { Form } from "react-bootstrap";

export const Filtros = ({
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  productos,
  precioSeleccionado,
  handlePrecioChange,
}) => {
  return (
    <>
      <Form.Select
        className="mt-3 f-select"
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        value={categoriaSeleccionada}>
        <option value="">Categorias</option>
        {[
          ...new Set(productos.map((producto) => producto.subcategoria.nombre)),
        ].map((categoria, index) => (
          <option key={index}>{categoria}</option>
        ))}
      </Form.Select>
      <Form.Select
        aria-label="Default select example"
        value={precioSeleccionado}
        onChange={handlePrecioChange}>
        <option value="">Recomendado</option>
        <option value="menor-mayor"> De menor precio a mayor precio</option>
        <option value="mayor-menor"> De mayor precio a menor precio</option>
      </Form.Select>
    </>
  );
};
