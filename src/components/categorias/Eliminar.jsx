import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import API_HOST from "@/config/config";
import axios from "axios";

const Eliminar = ({ setCategorias, categorias, guy }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setSelectedCategoryId(id);
  };
  const handleCategoryDelete = async () => {
    try {
      if (!selectedCategoryId) {
        console.log("mal");
        return;
      }
      const id = parseInt(selectedCategoryId);
      console.log(id);

      const response = await axios.delete(
        `${API_HOST}/api/categories/delete/${id}`,
        {
          data: { id },
        }
      );
      if (response.status === 200) {
        setCategorias(response.data.categorias);
        console.log(response);
      } else {
      }
    } catch (error) {
      console.error("Error al intentar eliminar la categoría", error);
      if (error.response.status === 401 || error.response === 403) {
        console.log("No tienes permisos");
      }
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
