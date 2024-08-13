import { useState } from "react";
import Eliminar from "./Eliminar";
import { Crear } from "./Crear";
import { Listar } from "./Listar";

const GestionSubcategorias = () => {
  const [subcategorias, setSubcategorias] = useState([]);
  return (
    <section>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-1 pt-3">
        <div className="flex flex-col gap-1">
          <Crear
            guy={"subcategoria"}
            setCategorias={setSubcategorias}
            url={"categorias"}
          />
          <Eliminar
            categorias={subcategorias}
            setCategorias={setSubcategorias}
            guy={"subcategoria"}
          />
        </div>
        <div className="lista-categrtorias bg-white p-3  rounded-sm">
          <h2 className="mb-2 text-lg">Lista de subcategorias</h2>
          <Listar subcategorias={subcategorias} setSubcategorias={setSubcategorias} />
        </div>
      </div>
    </section>
  );
};

export default GestionSubcategorias;
