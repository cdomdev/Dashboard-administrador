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
  const [isLoading, setIsloading] = useState(false)

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setSelectedCategoryId(id);
  };

  const handleCategoryDelete = async () => {
    setIsloading(true)
    if (!selectedCategoryId) {
      setToastMessage("Por favor seleccione una categoría");
      setBgToast("warning");
      setShowToast(true);
      setIsloading(false)
      return;
    }

    try {
      const id = selectedCategoryId;
      const response = await deleteCategory(id);
      if (response.status === 200) {
        setCategorias(response.data.categorias);
        setBgToast("success");
        setToastMessage(`Categoria eliminada con exito`);
        setShowToast(true);
        selectedCategoryId(null);
        setIsloading(false)
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          setBgToast("warning");
          setToastMessage("No tienes los permisos para esta operación");
          setShowToast(true);
          setCategorias(false)
        } else if (status === 500) {
          setBgToast("danger");
          setCategorias(false)
          setToastMessage(
            "Hubo un error al eliminar la categoría, inténtelo de nuevo"
          );
          setShowToast(true);
        } else {
          setBgToast("danger");
          setCategorias(false)
          setToastMessage(
            "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."
          );
          setShowToast(true);
        }
      }
    } finally {
      setIsloading(false)
    }
  };

  return (
    <>
      <div className="bg-white p-3 rounded-sm">
        <h4 className="text-base md:text-lg mb-1 font-semibold">Eliminar {guy}</h4>
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
          className="mt-4 w-full py-2 text-xs md:text-base"
          onClick={handleCategoryDelete}>
          {isLoading ? (
            <>
              Elimininado {guy}
            </>
          ) : <>  Eliminar {guy}</>}
        </Button>
      </div>
    </>
  );
};

export default Eliminar;
