import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { createCategory } from "@/services/categorias";

export const Crear = ({
  setCategorias,
  guy,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsloading] = useState(false)
  const handleCategory = async () => {
    setIsloading(true)
    try {
      if (
        !categoryName ||
        typeof categoryName !== "string" ||
        categoryName.length === 0
      ) {
        setBgToast("danger");
        setShowToast(true);
        setIsloading(false)
        setToastMessage("Este campo solo debe contener texto");
        return;
      }

      const data = { nombre: categoryName };
      const response = await createCategory(data);
      if (response.status === 201) {
        setCategorias(response.data.categorias);
        setCategoryName("");
        setBgToast("success");
        setIsloading(false)
        setShowToast(true);
        setToastMessage("Nueva categoria agregada con exito");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          setBgToast("warning");
          setIsloading(false)
          setToastMessage("No tienes los permisos para esta operación");
          setShowToast(true);
        } else if (status === 500) {
          setBgToast("danger");
          setIsloading(false)
          setToastMessage(
            "Hubo un error al crear una nueva categoria, inténtelo de nuevo"
          );
          setShowToast(true);
        }
      } else {
        setBgToast("danger");
        setIsloading(false)
        setToastMessage(
          "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."
        );
        setShowToast(true);
      }
    } finally {
      setIsloading(false)
    }
  };
  return (
    <div className="bg-white p-7 rounded-sm">
      <h2 className="text-base md:text-lg mb-2 font-semibold">Agregar nueva {guy}</h2>
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
        className="w-full py-2 text-xs md:text-base">
        {isLoading ? (
          <> Creando {guy}</>
        ) : <>Agregar {guy}</>}
      </Button>
    </div>
  );
};
