import { useState } from "react";
import { Button } from "react-bootstrap";
import API_HOST from "../../config/config";
import "./style.css";
import axios from "axios";

const states = {
  alistamiento: "alistamiento",
  camino: "camino",
  entregado: "entregado",
};

export const ModifcarEstado = ({ pedido }) => {
  const [estado, setEstado] = useState(pedido.estado);

  const handleChangeEstado = async (e) => {
    try {
      const response = await axios.post(
        `${API_HOST}/api/update/state-orders/${pedido.id}`,
        {
          estado: estado,
        }
      );

      if (response.status === 200) {
        console.log("estado actulizado");
      }
    } catch (error) {
      console.log("Error en la actulizacion del estado", error);
    }
  };

  const estadoPedido = pedido.detalles_pedido[0]?.estado_pedido
    ? pedido.detalles_pedido[0]?.estado_pedido
    : "Pedido sin estado";

  const estadoClase = states[estadoPedido] || "";

  return (
    <div className="flex items-center justify-end gap-2">
      <p className="hidden md:block text-sm md:text-base">
        Estado del pedido:{" "}
      </p>
      <span
        className={`state ${estadoClase} p-2  text-xs md:text-base md:uppercase rounded-md`}>
        {estadoPedido}
      </span>
      <select
        name="estado"
        id="estado"
        className="rounded-md border-slate-300 text-xs md:text-base"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}>
        <option value="">Seleccione un estado</option>
        <option value="alistamiento">En alistamiento...</option>
        <option value="camino">En camino</option>
        <option value="entregado">Entregado</option>
      </select>
      <Button onClick={handleChangeEstado} className="text-xs md:text-base">
        Actualizar
      </Button>
    </div>
  );
};
