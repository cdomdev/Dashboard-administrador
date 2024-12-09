import { useState, useEffect } from "react";
import Crear from "./Crear";
import Listado from "./Listado";
import GuardarProductos from "./GuardarProductos";
import { listarCat } from "../../services/categorias";
import { listarSub } from "../../services/subcategorias";
import { ToastCammon } from "../ToastCammon";

const NuevosProductos = () => {
  const [listado, setListado] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [bgToast, setBgToast] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasResult, subcategoriasResult] = await Promise.all([
          listarCat(),
          listarSub(),
        ]);

        setCategorias(categoriasResult || []);
        setSubcategorias(subcategoriasResult.categorias || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="p-2 sm:ml-64 mt-12 bg-[#f5f6fa] min-h-screen font-text-cust-2">
      <div className="dark:border-gray-700 mt-2">
        <section className="productos flex flex-col md:flex-row gap-2 md:gap-4 py-3 w-full relative">
          <ToastCammon
            bgToast={bgToast}
            setShowToast={setShowToast}
            toastMessage={toastMessage}
            showToast={showToast}
          />
          <aside className="w-full md:w-1/3">
            <Crear
              setListado={setListado}
              categorias={categorias}
              subcategorias={subcategorias}
              setToastMessage={setToastMessage}
              setBgToast={setBgToast}
              setShowToast={setShowToast}
            />
          </aside>
          <article className="flex flex-wrap md:w-2/3 w-full bg-white p-4 h-auto gap-4 shadow-sm">
            <Listado
              listado={listado}
              setListado={setListado}
              setToastMessage={setToastMessage}
              setBgToast={setBgToast}
              setShowToast={setShowToast}
            />
          </article>
          <div className="btn-save">
            {listado && listado.length > 0 ? (
              <GuardarProductos
                setListadoState={setListado}
                listadoState={listado}
                setToastMessage={setToastMessage}
                setBgToast={setBgToast}
                setShowToast={setShowToast}
              />
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default NuevosProductos;
