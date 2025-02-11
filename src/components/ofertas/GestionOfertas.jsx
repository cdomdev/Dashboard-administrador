import { useState } from "react";
import Crear from "./Crear";
import Listado from "./Listado";
import { ToastCammon } from "../ToastCammon";

const Ofertas = () => {
  const [ofertas, setOfertas] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [bgToast, setBgToast] = useState("");

  return (
    <section className="p-2 sm:ml-64 mt-12 bg-[#f5f6fa] min-h-screen font-">
      <ToastCammon
        bgToast={bgToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
        showToast={showToast}
      />
      <div className="dark:border-gray-700 mt-1">
        <div className="flex flex-col md:flex-row pt-3 gap-1 mt-2">
          <div className="min-w-w-3/6">
            <Crear
              setOfertas={setOfertas}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              setBgToast={setBgToast}
            />
          </div>
          <div className="h-2/3 w-full">
            <Listado
              ofertas={ofertas}
              setOfertas={setOfertas}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              setBgToast={setBgToast}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ofertas;
