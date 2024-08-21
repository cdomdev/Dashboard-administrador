import { useEffect, useState } from "react";
import Eliminar from "./Eliminar";
import { Crear } from "./Crear";
import { Listar } from "./Listar";
import { ToastCammon } from "../ToastCammon";
import { checkSession } from "@/utils/checkSession";

const GestionCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [bgToast, setBgToast] = useState("");

  useEffect(() => {
    const sesion = checkSession();
    if (!sesion) {
      window.location.href = "/";
    }
  }, []);

  return (
    <section className="p-2 sm:ml-64 mt-12 bg-[#f5f6fa] min-h-screen">
      <ToastCammon
        bgToast={bgToast}
        setShowToast={setShowToast}
        showToast={showToast}
        toastMessage={toastMessage}
      />
      <div className="dark:border-gray-700 mt-1">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-1 pt-3">
          <div className="flex flex-col gap-1">
            <Crear
              guy={"categoria"}
              setCategorias={setCategorias}
              url={"categorias"}
              setToastMessage={setToastMessage}
              setBgToast={setBgToast}
              setShowToast={setShowToast}
            />
            <Eliminar
              categorias={categorias}
              setCategorias={setCategorias}
              guy={"categoria"}
              setToastMessage={setToastMessage}
              setBgToast={setBgToast}
              setShowToast={setShowToast}
            />
          </div>
          <div className="lista-categrtorias bg-white p-3 rounded-sm">
            <h2 className="mb-2 text-lg">Lista de categorias</h2>
            <Listar categorias={categorias} setCategorias={setCategorias} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GestionCategorias;
