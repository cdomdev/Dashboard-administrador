import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Up } from "../icons/Up";
import { saveImage } from "../../services/productos";

const Crear = ({ setListado, categorias, subcategorias }) => {
  const [fileName, setFileName] = useState("");

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

    const {
      marca,
      description,
      nombre,
      valor,
      cantidad,
      referencia,
      imagesToSend,
    } = productState;

    // formateo a valor real
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
      return;
    }

    const formData = new FormData();
    formData.append("files", imagesToSend);
    try {
      const response = await saveImage(formData);
      if (response.status === 200 || response.status === 201) {
        const { uploadedFiles } = response.data;
        const imageUrls = uploadedFiles.map((file) => file.imageUrl);

        // Obtener el nombre de la categoría seleccionada
        const selectedCategory = categorias.find(
          (cat) => cat.id === Number(selectedCategoria)
        );
        const selectedCategoryName = selectedCategory
          ? selectedCategory.nombre
          : "";

        // Obtener el nombre de la subcategoría seleccionada
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
      }
    } catch (error) {
      console.log(`Hubo un error en la solicitud ${error}`);
    }
  };

  return (
    <div className="p-3 bg-white rounded-sm text-black">
      <Form onSubmit={getFormValues}>
        <Form.Label className="m-0 pl-1">Marca del producto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Corona"
          className="rounded-md border-slate-300 text-sm focus:outline-none shadow-none focus:border-slate-300"
          value={productState.marca}
          onChange={(e) =>
            setProductState({ ...productState, marca: e.target.value })
          }
          minLength={1}
          maxLength={50}
        />

        <Form.Label className="m-0 pl-1">Nombre del producto</Form.Label>
        <Form.Control
          type="text"
          className="rounded-md border-slate-300 text-sm focus:outline-none shadow-none focus:border-slate-300"
          placeholder="Concolor"
          value={productState.nombre}
          onChange={(e) =>
            setProductState({ ...productState, nombre: e.target.value })
          }
          minLength={1}
          maxLength={100}
        />

        <Form.Label className="m-0 pl-1">Precio del producto</Form.Label>
        <Form.Control
          type="number"
          placeholder="120000"
          className="rounded-md border-slate-300 text-sm focus:outline-none shadow-none focus:border-slate-300"
          value={productState.valor}
          onChange={(e) =>
            setProductState({ ...productState, valor: e.target.value })
          }
          maxLength={30}
          minLength={1}
        />

        <Form.Label className="m-0 pl-1">Referencia del producto</Form.Label>
        <Form.Control
          type="text"
          className="mb-1 rounded-md border-slate-300 text-sm focus:outline-none shadow-none focus:border-slate-300"
          placeholder="90123232"
          value={productState.referencia}
          onChange={(e) => {
            setProductState({ ...productState, referencia: e.target.value });
          }}
          maxLength={20}
          minLength={1}
        />

        <Form.Label className="m-0 pl-1">Cantidad</Form.Label>
        <span className="grid grid-cols-2 gap-1">
          <Form.Control
            type="number"
            className="rounded-md border-slate-300 text-sm focus:outline-none shadow-none focus:border-slate-300"
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
            className="custom-file-upload form-ref cursor-pointer flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-500 duration-150">
            <Up />
            <span className="text-sm ">Agregar imagen</span>
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
        <Form.Label className="my-1 pl-1">
          Relacionar a una categoría
        </Form.Label>
        <Form.Select
          onChange={handleCategoriaChange}
          value={selectedCategoria}
          className="focus:outline-none shadow-none focus:border-slate-300">
          <option>Seleccionar categoria</option>
          {categorias &&
            categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
        </Form.Select>

        {/* Subcategoria */}
        <Form.Label className="my-1 pl-1">Añadir a una subcategoría</Form.Label>
        <Form.Select
          onChange={handleSubcategoriaChange}
          value={selectedSubCategoria}
          className="focus:outline-none shadow-none focus:border-slate-300">
          <option>Relacionar a Subcategoria</option>
          {subcategorias &&
            subcategorias.map((subcategoria) => (
              <option key={subcategoria.id} value={subcategoria.id}>
                {subcategoria.nombre}
              </option>
            ))}
        </Form.Select>

        {/* Descripcion */}
        <Form.Label className="my-1 pl-1">
          Agregar descripcion de producto
        </Form.Label>
        <Form.Control
          as="textarea"
          className="focus:outline-none shadow-none focus:border-slate-300"
          placeholder="Descripcion... "
          value={productState.description}
          onChange={(e) =>
            setProductState({ ...productState, description: e.target.value })
          }
        />

        <Button
          className="btn mt-2 w-full py-2 text-base"
          variant="primary"
          type="submit">
          Agregar producto
        </Button>
      </Form>
    </div>
  );
};

export default Crear;
