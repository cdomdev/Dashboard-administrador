import { Form } from "react-bootstrap";

export const Filtros = ({
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  productos,
}) => {
  return (
    <>
      <Form.Select
        className="text-sm md:text-base"
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        value={categoriaSeleccionada}>
        <option value="">Categorias</option>
        {[
          ...new Set(productos.map((producto) => producto.subcategoria.nombre)),
        ].map((categoria, index) => (
          <option key={index}>{categoria}</option>
        ))}
      </Form.Select>
    </>
  );
};
