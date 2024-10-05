import { useEffect, useState } from "react";
import Eliminar from "./Eliminar";
import { Crear } from "./Crear";
import { Listar } from "./Listar";
import { ToastCammon } from "../ToastCammon";
import { checkSession } from "@/utils/checkSession";

const GestionSubcategorias = () => {
  const [subcategorias, setSubcategorias] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [bgToast, setBgToast] = useState("");

  return (
    <section className="p-2 sm:ml-64 mt-12 bg-[#f5f6fa] min-h-screen font-text-cust-2">
      <div className="dark:border-gray-700 mt-1">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-1 pt-4">
          <ToastCammon
            bgToast={bgToast}
            setShowToast={setShowToast}
            showToast={showToast}
            toastMessage={toastMessage}
          />
          <div className="flex flex-col gap-1">
            <Crear
              guy={"subcategoria"}
              setCategorias={setSubcategorias}
              url={"categorias"}
              setBgToast={setBgToast}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
            />
            <Eliminar
              categorias={subcategorias}
              setCategorias={setSubcategorias}
              guy={"subcategoria"}
              setBgToast={setBgToast}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
            />
          </div>
          <div className="lista-categrtorias bg-white p-3  rounded-sm">
            <h2 className="mb-2 text-lg">Lista de subcategorias</h2>
            <Listar
              subcategorias={subcategorias}
              setSubcategorias={setSubcategorias}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GestionSubcategorias;
