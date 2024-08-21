import { Form } from "react-bootstrap";

export const Filtros = ({
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  productos,
  precioSeleccionado,
  setData,
  setPrecioSeleccionado,
  data,
}) => {
  const handlePrecioChange = (e) => {
    setPrecioSeleccionado(e.target.value);

    if (e.target.value === "menor-mayor") {
      const productosOrdenados = [...data].sort(
        (a, b) => parseFloat(a.valor) - parseFloat(b.valor)
      );
      setData(productosOrdenados);
    } else if (e.target.value === "mayor-menor") {
      const productosOrdenados = [...data].sort(
        (a, b) => parseFloat(b.valor) - parseFloat(a.valor)
      );
      setData(productosOrdenados);
    }
  };

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
      <Form.Select
        className="text-sm md:text-base"
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
