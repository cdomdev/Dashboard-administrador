import formatedDate from "../../utils/formatedDate";
import Eliminar from "./Eliminar";
import Actualizar from "./Actualizar";
import { useEffect } from "react";
import { listar } from "@/services/ofertas";

const Listado = ({ ofertas, setOfertas }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listar();
        setOfertas(result.ofertas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-white w-full p-3">
      <h4 className="text-lg font-semibold mb-2">Ofertas vigentes</h4>
      {ofertas && ofertas.length > 0 ? (
        <>
          {ofertas.map((oferta, index) => (
            <div
              key={oferta.id || index}
              className="border p-3 mb-1 flex flex-col gap-2">
              <div className="bg-[#cfe2ff] py-2 px-3 transform uppercase font-bold">
                <h4>{oferta.nombre}</h4>
              </div>
              <div className="flex flex-col md:flex-row p-2 gap-4">
                <div>
                  <p className="font-bold">
                    Descuento: <strong>{oferta.descuento}%</strong>
                  </p>
                  <p className="font-bold">Fecha de inicio:</p>
                  <span className="text-sm font-semibold text-slate-600">
                    {formatedDate(oferta.fecha_inicio)}
                  </span>
                  <p className="font-bold">Fecha final</p>
                  <span className="text-sm font-semibold text-slate-600">
                    {formatedDate(oferta.fecha_fin)}
                  </span>
                </div>
                <ul>
                  <h5 className="font-bold">Productos de la oferta:</h5>
                  {oferta.Productos && oferta.Productos.length > 0 ? (
                    oferta.Productos.map((producto) => (
                      <li key={producto.id} className="text-sm list-disc">
                        {producto.nombre}
                      </li>
                    ))
                  ) : (
                    <li>No hay productos disponibles</li>
                  )}
                </ul>
                <div className="flex flex-col gap-2 justify-center">
                  <Eliminar oferta={oferta} setOfertaListado={setOfertas} />
                  <Actualizar oferta={oferta} setOferta={setOfertas} />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>
          <p className="text-base">No hay ofertas disponibles</p>
        </div>
      )}
    </div>
  );
};

export default Listado;
