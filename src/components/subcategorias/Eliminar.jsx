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

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setSelectedCategoryId(id);
  };

  const handleCategoryDelete = async () => {
    if (!selectedCategoryId) {
      setToastMessage("Por favor seleccione una subcategoría");
      setBgToast("warning");
      setShowToast(true);
      return;
    }

    try {
      const id = parseInt(selectedCategoryId);
      const response = await deleteSubcategory(id);

      if (response.status === 200) {
        setCategorias(response.data.categorias);
        setToastMessage("Subcategoria eliminada con exito");
        setBgToast("success");
        setSelectedCategoryId(null);
        setShowToast(true);
      }
    } catch (error) {
      if (error && error.response === 500) {
        setToastMessage("Algo salio interno, intentalo de nuevo");
        setBgToast("success");
        setSelectedCategoryId(null);
      }
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
