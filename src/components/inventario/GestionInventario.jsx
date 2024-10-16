import { useEffect, useState } from "react";
import { productos } from "../../services/inventario";
import formateValue from "../../utils/formateValue";
import Editar from "./Editar";
import Actualizar from "./Actualizar";
import Eliminar from "./Eliminar";
import { Filtros } from "./Filtros";
import { ToastCammon } from "../ToastCammon";
import { Database } from "../icons/Database";


const GestionInventario = () => {
  const [data, setData] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [precioSeleccionado, setPrecioSeleccionado] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [bgToast, setBgToast] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productos();
        setData(result.productos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  console.log(data)

  const productosFiltrados = data.filter((producto) => {
    return (
      !categoriaSeleccionada ||
      producto.subcategoria.nombre.trim() === categoriaSeleccionada
    );
  });

  return (
    <section className="p-2 sm:ml-64 mt-12 bg-[#f5f6fa] min-h-screen font-text-cust-2">
      <ToastCammon
        bgToast={bgToast}
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
      />
      <div className="dark:border-gray-700 mt-2">
        <div className="flex bg-white items-center mb-2 mt-4 px-4 justify-end">
          <span className="mr-3 text-base font-semibold hidden md:block">
            Filtrar por:{" "}
          </span>
          <div className="flex items-center justify-center gap-2 py-2">
            <Filtros
              categoriaSeleccionada={categoriaSeleccionada}
              setCategoriaSeleccionada={setCategoriaSeleccionada}
              productos={data}
            />
          </div>
        </div>
        <div className="flex flex-wrap md:grid md:grid-cols-cust gap-2  ">
          {data === null || data.length === 0 && (
            <div className="w-full bg-white p-2 flex flex-col items-center">
              <p className="text-sm md:text-base text-center">
                No hay productos en el inventario
              </p>
              <Database />
            </div>
          )}
          {productosFiltrados &&
            productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="flex items-center p-3 flex-col bg-white">
                <div className=" flex flex-col md:grid md:grid-cols-custe">
                  <div className="flex items-center flex-col justify-center ">
                    <img
                      src={producto.image}
                      alt={producto.nombre}
                      className=" w-44 md:w-64"
                      loading="lazy"
                    />
                    <p className="font-semibold text-center text-xs my-1 text-wrap md:text-sm mt-1">
                      {producto.nombre}
                    </p>
                  </div>
                  <div className="leading-4 flex flex-col text-sm">
                    <span>
                      <strong>Marca:</strong>
                      {producto.marca}
                    </span>

                    <span>
                      <strong>Precio: </strong> $
                      {formateValue(parseInt(producto.valor, 10))}
                    </span>
                    <span>
                      <strong>Referencia: </strong> {producto.referencia}
                    </span>
                    <span>
                      <strong>Cantidad en inventario: </strong>
                      {producto.Inventarios.length > 0
                        ? producto.Inventarios[0].cantidad
                        : 0}
                    </span>
                    <span>
                      <strong>Categoria: </strong>
                      {producto.categoria.nombre || "Sin categoría"}
                    </span>
                    <span>
                      <strong>Subcategoria: </strong>
                      {producto.subcategoria.nombre || "Sin subcategoría"}
                    </span>
                    <strong>Descripción:</strong>
                    <p>{producto.description}</p>
                  </div>
                </div>
                <div className="bg-[#f4f4f4] w-full flex gap-3 justify-center py-[10px] px-0 mt-10 ">
                  <Editar
                    producto={producto}
                    setToastMessage={setToastMessage}
                    setBgToast={setBgToast}
                    setShowToast={setShowToast}
                    setProductos={setData}
                    currentStock={
                      producto.Inventarios.length > 0
                        ? producto.Inventarios[0].cantidad
                        : 0
                    }
                  />
                  <Actualizar
                    producto={producto}
                    setData={setData}
                    setToastMessage={setToastMessage}
                    setBgToast={setBgToast}
                    setShowToast={setShowToast}
                  />
                  <Eliminar
                    setData={setData}
                    producto={producto}
                    setToastMessage={setToastMessage}
                    setBgToast={setBgToast}
                    setShowToast={setShowToast}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default GestionInventario;
