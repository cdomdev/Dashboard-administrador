import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import API_HOST from "../../config/config";
import axios from "axios";

export const Crear = ({ setCategorias, guy }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCategory = async () => {
    try {
      if (!categoryName) {
        console.log("faltan datos");
        return;
      }

      const data = { nombre: categoryName };
      const response = await axios.post(
        `${API_HOST}/api/subcategories/create`,
        data
      );

      console.log(response);
      if (response.status === 201) {
        console.log(response);
        setCategorias(response.data.categorias);
        setCategoryName(" ");
      }
    } catch (error) {
      console.log("Error en la crecion de la categoria", error);
    }
  };
  return (
    <div className="bg-white p-7 rounded-sm">
      <h2 className="text-lg mb-2">Agregar nueva {guy}</h2>
      <FloatingLabel
        controlId="floatingInput"
        label={`Nombre de la ${guy}`}
        className="mb-3 rounded-md">
        <Form.Control
          type="text"
          placeholder="Agregar categoría"
          className="input-category rounded-md border-gray-300"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </FloatingLabel>

      <Button
        variant="primary"
        onClick={handleCategory}
        className="w-full py-2 text-base">
        Agregar {guy}
      </Button>
    </div>
  );
};
