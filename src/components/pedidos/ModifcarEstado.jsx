import { useState } from "react";
import { Button } from "react-bootstrap";
import "./style.css";
import { updateState } from "../../services/pedidos";
import { ToastCammon } from "../ToastCammon";
import { createDetallePDF } from "@/utils/createDetallePDF";

const states = {
  alistamiento: "alistamiento",
  camino: "camino",
  entregado: "entregado",
};

export const ModifcarEstado = ({ pedido, user }) => {
  const [estado, setEstado] = useState(pedido.estado);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [bgToast, setBgToast] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToast = (bgName, message) => {
    setShowToast(true);
    setBgToast(bgName);
    setIsLoading(false);
    setToastMessage(message);
  };

  const handleChangeEstado = async () => {
    try {
      setIsLoading(true);
      const response = await updateState(pedido.id, estado, user);
      if (response.status === 200) {
        setEstado(response.data.estado);
        handleToast(
          "success",
          "Estado del pedido actualizado con exito, en un momento se vera reflejado el nuevo estado"
        );
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          handleToast("warnign", "No tienes los permisos para esta operacion");
        } else if (status === 500) {
          handleToast(
            "danger",
            "Hubo un error intentar actulizar el estado del pedido, inténtelo de nuevo"
          );
        }
      }
      handleToast(
        "danger",
        "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const estadoPedido = pedido ? pedido.estado_pedido : "Pedido sin estado";
  const estadoClase = states[estadoPedido] || "";

  return (
    <div className="flex items-center justify-end gap-2">
      <ToastCammon
        bgToast={bgToast}
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
      />
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
        {isLoading ? "Actulizando..." : "Actulizar"}
      </Button>
      <button
        onClick={() => createDetallePDF(user, pedido)}
        className="hidden md:flex items-center gap-1 border text-xs md:text-sm uppercase border-gray-300 bg-gray-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 hover:text-white duration-150">
        Descargar detalles del pedido
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-download size-4 md:size-5">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
          <path d="M7 11l5 5l5 -5" />
          <path d="M12 4l0 12" />
        </svg>
      </button>
    </div>
  );
};
