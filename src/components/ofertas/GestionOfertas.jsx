import { useState } from "react";
import Crear from "./Crear";
import Listado from "./Listado";

const Ofertas = () => {
  const [ofertas, setOfertas] = useState([]);

  return (
    <section>
      <div className="flex flex-col md:flex-row pt-3 gap-1">
        <div className="min-w-w-3/6">
          <Crear setOfertas={setOfertas} />
        </div>
        <div className="h-2/3 w-full">
          <Listado ofertas={ofertas} setOfertas={setOfertas} />
        </div>
      </div>
    </section>
  );
};

export default Ofertas;
