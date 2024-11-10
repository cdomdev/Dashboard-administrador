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
  const [loading, setLoading] = useState(false);

  const handleToast = (bgName, message) => {
    setBgToast(bgName);
    setShowToast(true);
    setIsloading(false);
    setToastMessage(message);
  };

  const handleCategory = async () => {
    setLoading(true);
    try {
      if (
        !categoryName ||
        typeof categoryName !== "string" ||
        categoryName.length === 0
      ) {
        handleToast("danger", "El campo de crear solo debe contener texto");
        return;
      }
      const data = { nombre: categoryName };
      const response = await createSubcategory(data);
      if (response.status === 201) {
        setCategorias(response.data.categorias);
        handleToast("success", "Nueva subcategoria agregada con exito");
      }
    } catch (error) {
      console.error("Error en la crecion de la categoria", error);
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          handleToast("warning", "No tienes los permisos para esta operación");
        } else if (status === 500) {
          handleToast(
            "danger",
            "Hubo un error al crear una nueva subcategoria, inténtelo de nuevo"
          );
        }
      }
      handleToast(
        "danger",
        "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white p-7 rounded-sm">
      <h2 className="text-base md:text-lg mb-2 font-semibold">
        Agregar nueva {guy}
      </h2>
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
        {loading ? <>Creando {guy}</> : <>Agregar {guy}</>}
      </Button>
    </div>
  );
};
