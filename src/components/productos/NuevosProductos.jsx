import { useState, useEffect } from "react";
import Crear from "./Crear";
import Listado from "./Listado";
import GuardarProductos from "./GuardarProductos";
import { listarCat } from "../../services/categorias";
import { listarSub } from "../../services/subcategorias";

const NuevosProductos = () => {
  const [listado, setListado] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

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
    <section className="productos flex flex-col md:flex-row gap-2 md:gap-4 py-3 w-full relative">
      <aside className="w-full md:w-1/3">
        <Crear
          setListado={setListado}
          categorias={categorias}
          subcategorias={subcategorias}
        />
      </aside>
      <article className="flex flex-wrap md:w-2/3 w-full bg-white p-4 h-auto gap-4">
        <Listado listado={listado} setListado={setListado} />
      </article>
      <div className="btn-save">
        {listado && listado.length > 0 ? (
          <GuardarProductos
            setListadoState={setListado}
            listadoState={listado}
          />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default NuevosProductos;
