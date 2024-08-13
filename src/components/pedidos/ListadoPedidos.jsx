import { useEffect, useState } from "react";
import Listado from "./Listado";

const ListadoPedidos = () => {
  const [pedidos, setPedidos] = useState(null);

  return (
    <div className="w-full pt-2 bg-white p-3 min-h-screen mt-3">
      <Listado pedidos={pedidos} setPedidos={setPedidos} />
    </div>
  );
};

export default ListadoPedidos;
