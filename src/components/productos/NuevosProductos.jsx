import { useState } from "react";
import Crear from "./Crear";
import Listado from "./Listado";
import GuardarProductos from "./GuardarProductos";

const NuevosProductos = () => {
  const [listado, setListado] = useState(null);

  return (
    <section className="productos flex flex-col md:flex-row gap-2 md:gap-4 py-3 w-full">
      <aside className="w-full md:w-1/3">
        <Crear setListado={setListado} />
      </aside>
      <article className="flex flex-wrap items-center md:w-2/3 w-full">
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
