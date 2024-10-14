import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Up } from "../icons/Up";
import { saveImage } from "../../services/productos";

const Crear = ({
  setListado,
  categorias,
  subcategorias,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedSubCategoria, setSelectedSubCategoria] = useState("");

  const [productState, setProductState] = useState({
    marca: "",
    nombre: "",
    description: "",
    valor: "",
    displayImages: "",
    cantidad: "",
    referencia: "",
    imagesToSend: "",
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileName(selectedFile ? selectedFile.name : "");

    setProductState({
      ...productState,
      displayImages: URL.createObjectURL(selectedFile),
      imagesToSend: selectedFile,
    });
  };

  const handleCategoriaChange = (event) => {
    setSelectedCategoria(event.target.value);
  };

  const handleSubcategoriaChange = (event) => {
    setSelectedSubCategoria(event.target.value);
  };

  const getFormValues = async (e) => {
    e.preventDefault();
    setLoading(true)

    const {
      id,
      marca,
      description,
      nombre,
      valor,
      cantidad,
      referencia,
      imagesToSend,
    } = productState;


    const precio = parseInt(valor).toFixed(2);

    if (
      !marca ||
      !description ||
      !precio ||
      !cantidad ||
      !referencia ||
      !nombre ||
      imagesToSend.length === 0
    ) {
      setBgToast("danger");
      setShowToast(true);
      setToastMessage("Faltan datos para el nuevo producto");
      setLoading(false)
      return;
    }

    const formData = new FormData();
    formData.append("files", imagesToSend);
    try {
      const response = await saveImage(formData);
      if (response.status === 200) {
        const { uploadedFiles } = response.data;
        const imageUrls = uploadedFiles.map((file) => file.imageUrl);

        const selectedCategory = categorias.find(
          (cat) => cat.id === Number(selectedCategoria)
        );
        const selectedCategoryName = selectedCategory
          ? selectedCategory.nombre
          : "";

        const selectedSubCategory = subcategorias.find(
          (sub) => sub.id === Number(selectedSubCategoria)
        );
        const selectedSubCategoryName = selectedSubCategory
          ? selectedSubCategory.nombre
          : "";

        const newProduct = {
          id: uuidv4(),
          marca: marca.toUpperCase(),
          nombre: nombre,
          description: description,
          valor: precio,
          cantidad: cantidad,
          referencia: referencia,
          image: imageUrls[0],
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
          image: "",
        });
        setFileName("");
        setToastMessage("Producto agregado exitosamente");
        setBgToast("success");
        setShowToast(true);
      }
    } catch (error) {
      console.log(`Hubo un error en la solicitud ${error}`);
      setToastMessage("Hubo un error al crear el produco, intentalo mas tarde");
      setBgToast("warning");
      setLoading(false)
      setShowToast(true);
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className="p-3 bg-white rounded-sm text-black">
      <Form onSubmit={getFormValues}>
        <Form.Label className="m-0 pl-1 text-sm">Marca del producto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Corona"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          value={productState.marca}
          onChange={(e) =>
            setProductState({ ...productState, marca: e.target.value })
          }
          minLength={1}
          maxLength={50}
        />

        <Form.Label className="m-0 pl-1 text-sm">Nombre del producto</Form.Label>
        <Form.Control
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Concolor"
          value={productState.nombre}
          onChange={(e) =>
            setProductState({ ...productState, nombre: e.target.value })
          }
          minLength={1}
          maxLength={100}
        />

        <Form.Label className="m-0 pl-1 text-sm">Precio del producto</Form.Label>
        <Form.Control
          type="number"
          placeholder="120000"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          value={productState.valor}
          onChange={(e) =>
            setProductState({ ...productState, valor: e.target.value })
          }
          maxLength={30}
          minLength={1}
        />

        <Form.Label className="m-0 pl-1 text-sm">Referencia del producto</Form.Label>
        <Form.Control
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="90123232"
          value={productState.referencia}
          onChange={(e) => {
            setProductState({ ...productState, referencia: e.target.value });
          }}
          maxLength={20}
          minLength={1}
        />

        <Form.Label className="m-0 pl-1 text-sm">Cantidad</Form.Label>
        <span className="grid grid-cols-2 gap-1">
          <Form.Control
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="1"
            value={productState.cantidad}
            onChange={(e) => {
              setProductState({ ...productState, cantidad: e.target.value });
            }}
            maxLength={10}
            minLength={1}
          />
          <label
            htmlFor="file-upload"
            className="custom-file-upload form-ref cursor-pointer flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-500 duration-150"
          >
            <Up />
            <span className="text-sm">Agregar imagen</span>
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            name="imagen"
            className=" shadow-none"
          />
        </span>
        <div>
          <span className="text-[#213C65]">{fileName}</span>
        </div>

        {/* Categoria */}
        <Form.Label className="my-1 pl-1 text-sm">
          Relacionar a una categoría
        </Form.Label>
        <Form.Select
          onChange={handleCategoriaChange}
          value={selectedCategoria}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        >
          <option>Seleccionar categoria</option>
          {categorias &&
            categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
        </Form.Select>

        {/* Subcategoria */}
        <Form.Label className="my-1 pl-1 text-sm">Añadir a una subcategoría</Form.Label>
        <Form.Select
          onChange={handleSubcategoriaChange}
          value={selectedSubCategoria}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        >
          <option>Relacionar a Subcategoria</option>
          {subcategorias &&
            subcategorias.map((subcategoria) => (
              <option key={subcategoria.id} value={subcategoria.id}>
                {subcategoria.nombre}
              </option>
            ))}
        </Form.Select>

        {/* Descripcion */}
        <Form.Label className="my-1 pl-1 text-sm">
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
          {
            loading ? (
              <p>Agregando nuevo produco...</p>
            ) : <p>Agregar producto</p>
          }
        </Button>
      </Form>
    </div>
  );
};

export default Crear;
