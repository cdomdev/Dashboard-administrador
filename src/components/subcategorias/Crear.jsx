import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { createSubcategory } from "@/services/subcategorias";

export const Crear = ({
  setCategorias,
  guy,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCategory = async () => {
    try {
      if (
        !categoryName ||
        typeof categoryName !== "string" ||
        categoryName.length === 0
      ) {
        setBgToast("danger");
        setShowToast(true);
        setToastMessage("Este campo solo debe contener texto");
        return;
      }

      const data = { nombre: categoryName };
      const response = await createSubcategory(data);
      if (response.status === 201) {
        setCategorias(response.data.categorias);
        setCategoryName("");
        setToastMessage("Nueva subcategoria agregada con exito");
        setBgToast("success");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error en la crecion de la categoria", error);
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          setBgToast("warning");
          setToastMessage("No tienes los permisos para esta operación");
          setShowToast(true);
        } else if (status === 500) {
          setBgToast("danger");
          setToastMessage(
            "Hubo un error crear una nueva categoria, inténtelo de nuevo"
          );
          setShowToast(true);
        } else {
          setBgToast("danger");
          setToastMessage(
            "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."
          );
          setShowToast(true);
        }
      }
    }
  };
  return (
    <div className="bg-white p-7 rounded-sm">
      <h2 className="text-base md:text-lg mb-2">Agregar nueva {guy}</h2>
      <FloatingLabel
        controlId="floatingInput"
        label={`Nombre de la ${guy}`}
        className="mb-3 rounded-md text-xs md:text-sm">
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
        className="w-full py-2 text-sm md:text-base">
        Agregar {guy}
      </Button>
    </div>
  );
};
