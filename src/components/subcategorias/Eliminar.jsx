import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { deleteSubcategory } from "../../services/subcategorias";

const Eliminar = ({
  setCategorias,
  categorias,
  guy,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setSelectedCategoryId(id);
  };

  const handleCategoryDelete = async () => {
    setLoading(true)
    if (!selectedCategoryId) {
      setToastMessage("Por favor seleccione una subcategoría");
      setBgToast("warning");
      setShowToast(true);
      setLoading(false)
      return;
    }

    try {
      const id = selectedCategoryId;
      const response = await deleteSubcategory(id);

      if (response.status === 200) {
        setCategorias(response.data.categorias);
        setToastMessage("Subcategoria eliminada con exito");
        setBgToast("success");
        setLoading(false)
        setSelectedCategoryId(null);
        setShowToast(true);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          setBgToast("warning");
          setLoading(false)
          setToastMessage("No tienes los permisos para esta operación");
          setShowToast(true);
        } else if (status === 500) {
          setBgToast("danger");
          setToastMessage(
            "Hubo un error al intentare eliminar la seubcategoria, inténtelo de nuevo"
          );
          setShowToast(true);
          setLoading(false)
        } else {
          setBgToast("danger");
          setToastMessage(
            "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."
          );
          setShowToast(true);
          setLoading(false)
        }
        setLoading(false)
      }
      setBgToast("danger");
      setToastMessage(
        "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."
      );
      setShowToast(true);
      setLoading(false)
    }
  };

  return (
    <>
      <div className="bg-white p-3 rounded-sm">
        <h4 className="text-base md:text-lg mb-1 font-semibold">Eliminar {guy}</h4>
        <p className="text-sm md:text-base mb-1">
          Antes de eliminar una categoria, asegurece que no tenga productos
          asociados.
        </p>
        <p className="text-sm ">Selecione la {guy} a eliminar:</p>
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
          className="mt-4 w-full py-2 text-sm md:text-base"
          onClick={handleCategoryDelete}>
          {loading ? (<>Eliminando {guy}</>) : <> Eliminar {guy}</>}
        </Button>
      </div>
    </>
  );
};

export default Eliminar;
