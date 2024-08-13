import { useEffect, useState } from "react";
import Eliminar from "./Eliminar";
import { Crear } from "./Crear";
import { Listar } from "./Listar";
import listarCat from "../../services/categorias";

const GestionCategorias = () => {
  const [categorias, setCategorias] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listarCat();
        setCategorias(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-1 pt-3">
        <div className="flex flex-col gap-1">
          <Crear
            guy={"categoria"}
            setCategorias={setCategorias}
            url={"categorias"}
          />
          <Eliminar
            categorias={categorias}
            setCategorias={setCategorias}
            guy={"categoria"}
          />
        </div>
        <div className="lista-categrtorias bg-white p-3 rounded-sm">
          <h2 className="mb-2 text-lg">Lista de categorias</h2>
          <Listar categorias={categorias} />
        </div>
      </div>
    </section>
  );
};

export default GestionCategorias;
