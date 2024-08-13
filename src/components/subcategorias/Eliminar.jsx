import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { deleteSubcategory } from "../../services/subcategorias";

const Eliminar = ({ setCategorias, categorias, guy }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setSelectedCategoryId(id);
  };
  const handleCategoryDelete = async () => {
    try {
      if (!selectedCategoryId) {
        console.log("faltan datos");
        return;
      }
      const id = parseInt(selectedCategoryId);

      console.log(id);
      const response = await deleteSubcategory(id)
      if (response.status === 200) {
        setCategorias(response.data.categorias);
      } else {
      }
    } catch (error) {
      console.error("Error al intentar eliminar la categoría", error);
    }
  };

  return (
    <>
      <div className="bg-white p-3 rounded-sm">
        <h4 className="text-lg">Eliminar {guy}</h4>
        <p className="text-base">
          Antes de eliminar una categoria, asegurece que no tenga productos
          asociados.
        </p>
        <p className="text">Selecione la {guy} a eliminar:</p>
        <Form.Select className="mt-3" onChange={(e) => handleCategoryChange(e)}>
          <option>Seleccionar {guy}</option>
          {categorias &&
            categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
        </Form.Select>

        <Button
          variant="danger "
          className="mt-4 w-full py-2"
          onClick={handleCategoryDelete}>
          Eliminar {guy}
        </Button>
      </div>
    </>
  );
};

export default Eliminar;
