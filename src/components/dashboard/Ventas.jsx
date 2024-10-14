import { ventas } from "@/services/balances";
import { useEffect, useState } from "react";
import { filterByDate } from "@/utils/filterByDate";
import { pagoTotalDePedidos } from "@/utils/pagoTotal";

export const Ventas = () => {
  const [dataVentas, setDataVentas] = useState([]);
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const fechtData = async () => {
      const ventasResponse = await ventas();
      if (ventas) {
        setDataVentas(ventasResponse.data);
        setFilteredVentas(ventasResponse.data);
      }
    };
    fechtData();
  }, []);

  useEffect(() => {
    if (filter === "este-mes" || filter === "mes-pasado") {
      const filteredData = filterByDate(dataVentas, filter);
      setFilteredVentas(filteredData);
    } else {
      setFilteredVentas(dataVentas);
    }
  }, [filter, dataVentas]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between p-1 md:p-0">
        <div>
          <h2 className="font-semibold text-lg md:text-xl ">
            Ventas recientes
          </h2>
          <p className="text-xs md:text-sm text-slate-500">
            Se realizaron {filteredVentas.length} ventas{" "}
            {filter === "este-mes"
              ? "este mes"
              : filter === "mes-pasado"
                ? "el mes pasado"
                : "en total"}
          </p>
        </div>
        <div>
          <form className="max-w-sm mx-auto">
            <select
              id="filter"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={filter}
              onChange={handleFilterChange}>
              <option value="all">Todos</option>
              <option value="este-mes">Este mes</option>
              <option value="mes-pasado">Mes pasado</option>
            </select>
          </form>
        </div>
      </div>
      <div className="pl-2 pt-4  max-h-[350px] overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {filteredVentas.length > 0 ? (
            filteredVentas.map((usuario, index) => (
              < li
                key={usuario.id || index}
                className="flex justify-between gap-1 md:gap-7 py-2 px-1 items-center" >
                <div className="flex gap-4">
                  <div>
                    {usuario.picture ? (
                      <img
                        src={usuario.picture}
                        alt="avatar del usuario, si existe"
                        className="rounded-full cursor-pointer relative w-14 h-10"
                        loading="lazy"
                      />
                    ) : (
                      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg
                          className="absolute w-12 h-12 text-gray-400 -left-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-full leading-4">
                    <span className="text-sm md:text-base font-semibold">
                      {usuario.nombre}
                    </span>
                    <span className="text-xs md:text-sm text-gray-600">
                      {usuario.email}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-base md:text-lg font-extrabold flex pesos gap-1 md:gap-2 items-center">
                    + {pagoTotalDePedidos(usuario.pedidos)}
                    <p className="font-light text-gray-700 hidden md:block md:text-sm">
                      COP
                    </p>
                  </span>
                </div>
              </li>
            ))
          ) : (
            <div className="w-full flex items-center justify-center">
              <span className="text-base text-gray-700">No hay ventas</span>
            </div>
          )}
        </ul>
      </div >
    </>
  );
};
