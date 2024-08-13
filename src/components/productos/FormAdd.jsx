import { Button, Form } from "react-bootstrap";
import { Up } from "../icons/Up";

const FormAdd = ({
  getFormValues,
  productState,
  subcategorias,
  setProductState,
  handleFileChange,
  categorias,
  fileName,
  selectedCategoria,
  selectedSubCategoria,
  handleSubcategoriaChange,
  handleCategoriaChange,
}) => {
  return (
    <div className="p-3 bg-white rounded-sm text-black">
      <Form onSubmit={getFormValues}>
        <Form.Label className="m-0">Marca del producto</Form.Label>
        <Form.Control
          type="text"
          placeholder="Corona"
          className="rounded-md  border-slate-300 text-sm focus:outline-none shadow-none focus:border-slate-300"
          value={productState.title}
          onChange={(e) =>
            setProductState({ ...productState, marca: e.target.value })
          }
          minLength={1}
          maxLength={50}
        />
        <Form.Label className="m-0">Nombre del producto</Form.Label>
        <Form.Control
          type="text"
          className="rounded-md  border-slate-300 text-sm focus:outline-none shadow-none focus:border-slate-300"
          placeholder="Concolor"
          value={productState.nombre}
          onChange={(e) =>
            setProductState({ ...productState, nombre: e.target.value })
          }
          minLength={1}
          maxLength={100}
        />
        <Form.Label className="m-0">Precio del producto</Form.Label>
        <Form.Control
          type="number"
          placeholder="120000"
          className="rounded-md  border-slate-300 text-sm focus:outline-none shadow-none focus:border-slate-300"
          value={productState.valor}
          onChange={(e) =>
            setProductState({ ...productState, valor: e.target.value })
          }
          maxLength={30}
          minLength={1}
        />
        <Form.Label className="m-0">Referencia del producto</Form.Label>
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
        <Form.Label className="m-0">Cantidad</Form.Label>
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
            <span className="text-sm">Añadir imagen</span>
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
        {/* categoria */}
        <Form.Label className="my-1">Relacionar a una categoría</Form.Label>
        <Form.Select
          onChange={handleCategoriaChange}
          value={selectedCategoria ? selectedCategoria.id : ""}
          className="focus:outline-none shadow-none focus:border-slate-300">
          <option>Seleccionar categoria</option>
          {categorias &&
            categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
        </Form.Select>

        {/* subcategoria */}
        <Form.Label className="my-1">Añadir a una subcategoría</Form.Label>
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
        {/* descripcion */}
        <Form.Label className="my-1">
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
        <span className="flex w-full">
          <Button
            className="btn mt-2 w-full py-2 text-base "
            variant="primary"
            type="submit">
            Agregar producto
          </Button>
        </span>
      </Form>
    </div>
  );
};

export default FormAdd;
