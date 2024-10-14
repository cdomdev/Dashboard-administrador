import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { deleteCategory } from "../../services/categorias";

const Eliminar = ({
  setCategorias,
  categorias,
  guy,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setSelectedCategoryId(id);
  };

  const handleCategoryDelete = async () => {
    if (!selectedCategoryId) {
      setToastMessage("Por favor seleccione una categoría");
      setBgToast("warning");
      setShowToast(true);
      return;
    }

    try {
      const id = parseInt(selectedCategoryId);
      const response = await deleteCategory(id);
      if (response.status === 200) {
        setCategorias(response.data.categorias);
        setBgToast("success");
        setToastMessage(`Categoria eliminada con exito`);
        setShowToast(true);
        selectedCategoryId(null);
      }
    } catch (error) {
      console.error("Error al intentar eliminar la categoría", error);
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          setBgToast("warning");
          setToastMessage("No tienes los permisos para esta operación");
          setShowToast(true);
        } else if (status === 500) {
          setBgToast("danger");
          setToastMessage(
            "Hubo un error al eliminar la categoría, inténtelo de nuevo"
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
    <>
      <div className="bg-white p-3 rounded-sm">
        <h4 className="text-base md:text-lg mb-1">Eliminar {guy}</h4>
        <p className=" text-sm md:text-base">
          Antes de eliminar una categoria, asegurece que no tenga productos
          asociados.
        </p>
        <p className="text-sm md:text-base mt-1">Selecione la {guy} a eliminar:</p>
        <Form.Select className="mt-3" onChange={(e) => handleCategoryChange(e)}>
          <option className="text-xs md:text-sm">Seleccionar {guy}</option>
          {categorias &&
            categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id} className="text-xs md:text-sm">
                {categoria.nombre}
              </option>
            ))}
        </Form.Select>

        <Button
          variant="danger "
          className="mt-4 w-full py-2 text-xs md:text-sm"
          onClick={handleCategoryDelete}>
          Eliminar {guy}
        </Button>
      </div>
    </>
  );
};

export default Eliminar;
