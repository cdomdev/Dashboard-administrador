import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { SaveImageCloud } from "./SaveImageCloud";

const Crear = ({
  setListado,
  categorias,
  subcategorias,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedSubCategoria, setSelectedSubCategoria] = useState("");
  const [upload, setUpload] = useState("");

  const [productState, setProductState] = useState({
    marca: "",
    nombre: "",
    description: "",
    valor: "",
    displayImages: "",
    cantidad: "",
    referencia: "",
  });

  const handleToast = (bgName, message) => {
    setBgToast(bgName);
    setShowToast(true);
    setToastMessage(message);
    setLoading(false);
  };

  const handleCategoriaChange = (event) => {
    setSelectedCategoria(event.target.value);
  };

  const handleSubcategoriaChange = (event) => {
    setSelectedSubCategoria(event.target.value);
  };

  const getFormValues = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { marca, description, nombre, valor, cantidad, referencia } =
      productState;

    const precio = parseInt(valor).toFixed(2);

    if (
      !marca ||
      !description ||
      !precio ||
      !cantidad ||
      !referencia ||
      !nombre
    ) {
      handleToast("danger", "Faltan datos para el nuevo producto");
      return;
    }

    try {
      const selectedCategory = categorias.find(
        (cat) => cat.id === selectedCategoria
      );

      const selectedCategoryName = selectedCategory
        ? selectedCategory.nombre
        : "";

      const selectedSubCategory = subcategorias.find(
        (sub) => sub.id === selectedSubCategoria
      );

      const selectedSubCategoryName = selectedSubCategory
        ? selectedSubCategory.nombre
        : "";

      const newProduct = {
        marca: marca.toUpperCase(),
        nombre: nombre,
        description: description,
        valor: precio,
        cantidad: cantidad,
        referencia: referencia,
        image: upload.info.secure_url,
        categoria_id: selectedCategoria,
        subcategoria_id: selectedSubCategoria,
        categoria: selectedCategoryName,
        subcategoria: selectedSubCategoryName,
      };

      setListado((prevListado) => {
        const newListado = prevListado
          ? [...prevListado, newProduct]
          : [newProduct];
        localStorage.setItem("productos", JSON.stringify(newListado));
        return newListado;
      });

      setProductState({
        marca: "",
        description: "",
        nombre: "",
        valor: "",
        cantidad: "",
        referencia: "",
      });
      setUpload("");
      handleToast("success", "Producto agregado exitosamente");
    } catch (error) {
      handleToast(
        "warning",
        "Hubo un error al crear el produco, intentalo mas tarde"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 bg-white rounded-sm text-black font-text-cust-2">
      <Form onSubmit={getFormValues}>
        <Form.Label className="m-0 pl-1 text-sm">Marca del producto</Form.Label>
        <Form.Control
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          value={productState.marca}
          onChange={(e) =>
            setProductState({ ...productState, marca: e.target.value })
          }
          minLength={1}
          maxLength={50}
        />
        <Form.Label className="m-0 pl-1 text-sm">
          Nombre del producto
        </Form.Label>
        <Form.Control
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          value={productState.nombre}
          onChange={(e) =>
            setProductState({ ...productState, nombre: e.target.value })
          }
          minLength={1}
          maxLength={100}
        />

        <Form.Label className="m-0 pl-1 text-sm">
          Precio del producto
        </Form.Label>
        <Form.Control
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          value={productState.valor}
          onChange={(e) =>
            setProductState({ ...productState, valor: e.target.value })
          }
          maxLength={30}
          minLength={1}
        />

        <Form.Label className="m-0 pl-1 text-sm">
          Referencia del producto
        </Form.Label>
        <Form.Control
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          value={productState.referencia}
          onChange={(e) => {
            setProductState({ ...productState, referencia: e.target.value });
          }}
          maxLength={20}
          minLength={1}
        />
        {/* Cantidad e imagen  */}
        <Form.Label className="m-0 pl-1 text-sm">Cantidad</Form.Label>
        <div className="grid grid-cols-2 gap-1">
          <Form.Control
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            value={productState.cantidad}
            onChange={(e) => {
              setProductState({ ...productState, cantidad: e.target.value });
            }}
            maxLength={10}
            minLength={1}
          />
          <SaveImageCloud setUpload={setUpload} />
        </div>
        <div>
          <span className="text-[#213C65]">
            {upload?.info?.display_name || ""}
          </span>
        </div>

        {/* Categoria */}
        <Form.Label className="my-2 pl-1 text-sm">
          Relacionar a una categoría
        </Form.Label>
        <Form.Select
          onChange={handleCategoriaChange}
          value={selectedCategoria}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
          <option>Seleccionar categoria</option>
          {categorias &&
            categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
        </Form.Select>

        {/* Subcategoria */}
        <Form.Label className="my-2 pl-1 text-sm">
          Relacionar a Subcategoria
        </Form.Label>
        <Form.Select
          onChange={handleSubcategoriaChange}
          value={selectedSubCategoria}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
          <option>Seleccionar subcategoria</option>
          {subcategorias &&
            subcategorias.map((subcategoria) => (
              <option key={subcategoria.id} value={subcategoria.id}>
                {subcategoria.nombre}
              </option>
            ))}
        </Form.Select>

        {/* Descripcion */}
        <Form.Label className="my-2 pl-1 text-sm">
          Agregar descripcion de producto
        </Form.Label>
        <Form.Control
          as="textarea"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Descripcion... "
          value={productState.description}
          onChange={(e) =>
            setProductState({ ...productState, description: e.target.value })
          }
        />

        <Button
          className="btn mt-3 w-full py-2 text-sm md:text-base"
          variant="primary"
          type="submit">
          {loading ? (
            <p>Agregando nuevo produco...</p>
          ) : (
            <p>Agregar producto</p>
          )}
        </Button>
      </Form>
    </div>
  );
};

export default Crear;
