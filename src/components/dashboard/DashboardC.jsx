import { CardItems } from "../Cards/CardItems";
import { Box } from "../icons/Box";
import { Time } from "../icons/Time";
import { SendBox } from "../icons/SendBox";
import { Sale } from "../icons/Sale";
import { Users } from "../icons/Users";
import balances from "@/services/balances";
import formateValue from "@/utils/formateValue";
import { useEffect, useState } from "react";
import { checkSession } from "@/utils/checkSession";
import { Loader } from "../Loader";
import { Graficas } from "../Graficas";

const DashboardC = () => {
  const [response, setResponse] = useState({});
  const [sesion, setSesion] = useState(false);

  useEffect(() => {
    const sesion = checkSession();
    const fechtData = async () => {
      const response = await balances();
      setResponse(response);
    };
    if (!sesion) {
      window.location.href = "/";
    } else {
      setSesion(true);
    }
    fechtData();
  }, []);

  const { users, totalOrders, totalSales, totalPending, totalShipped } =
    response?.data || {};
  const saledsFormater = formateValue(totalSales);

  return (
    <>
      {!sesion ? (
        <Loader />
      ) : (
        <section className="p-2 sm:ml-64 mt-12 bg-[#f5f6fa] ">
          <div className="dark:border-gray-700 mt-4 bg-white min-h-screen px-2 ">
            <section className="flex flex-col gap-4">
              <div className="flex gap-1 justify-center flex-wrap h-auto py-4 px-2 items-center w-full ">
                <CardItems
                  title="Total ordenes"
                  value={totalOrders}
                  text="Ordenees sin despachar">
                  <div className="rounded-full w-10 h-10 md:h-12 md:w-12 flex justify-center items-center p-1 bg-color-a">
                    <Box />
                  </div>
                </CardItems>
                <CardItems
                  title="Ordenes despachadas"
                  value={totalShipped}
                  text="Con estado de entregado">
                  <div className="rounded-full w-10 h-10 md:h-12 md:w-12 flex justify-center items-center p-1 bg-color-f">
                    <SendBox />
                  </div>
                </CardItems>
                <CardItems
                  title="Pendientes por envio"
                  value={totalPending}
                  text="Pendientes">
                  <div className="rounded-full w-10 h-10 md:h-12 md:w-12 flex justify-center items-center p-1 bg-color-e">
                    <Time />
                  </div>
                </CardItems>
                <CardItems
                  title="Total vendido"
                  value={saledsFormater}
                  text="Balance total de ventas">
                  <div className="rounded-full w-10 h-10 md:h-12 md:w-12 flex justify-center items-center p-1 bg-color-b">
                    <Sale />
                  </div>
                </CardItems>
                <CardItems
                  title="Total usuarios"
                  value={users}
                  text="Usuarios e invitados">
                  <div className="rounded-full w-10 h-10 md:h-12 md:w-12 flex justify-center items-center p-2 bg-color-c">
                    <Users />
                  </div>
                </CardItems>
              </div>
            </section>
            <section className="flex flex-col md:grid md:grid-cols-2 gap-3">
              <div className="h-auto rounded-md p-2 bg-white shadow">
                <h2 className="text-lg md:text-2xl font-semibold">
                  Productos mas vendidos
                </h2>
                <Graficas />
              </div>
              <div className="rounded-md p-4 bg-white shadow">
                <div>
                  <h2 className="font-semibold text-lg md:text-2xl">
                    Ventas recientes
                  </h2>
                  <p className="text-sm text-slate-500">
                    Se Realizaron 10 ventas este mes
                  </p>
                </div>
                <div className="pl-2 pt-4">
                  <ul className="flex flex-col gap-1">
                    <li className="flex justify-between gap-7 py-2 px-1 items-center">
                      <div className="flex gap-7 items-center">
                        <div>
                          <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            aria-expanded="false"
                            data-dropdown-toggle="dropdown-user">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                              alt="user photo"
                            />
                          </button>
                        </div>
                        <div>
                          <p className="font-semibold -0">Nombre</p>
                          <span className="text-sm text-slate-600">
                            correo@gmail.com
                          </span>
                        </div>
                      </div>
                      <div className="pr-6">
                        <span className="font-extrabold text-lg">
                          + 150.000
                        </span>
                      </div>
                    </li>
                    <li className="flex justify-between gap-7 py-2 px-1 items-center">
                      <div className="flex gap-7 items-center">
                        <div>
                          <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            aria-expanded="false"
                            data-dropdown-toggle="dropdown-user">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                              alt="user photo"
                            />
                          </button>
                        </div>
                        <div>
                          <p className="font-semibold -0">Nombre</p>
                          <span className="text-sm text-slate-600">
                            correo@gmail.com
                          </span>
                        </div>
                      </div>
                      <div className="pr-6">
                        <span className="font-extrabold text-lg">
                          + 150.000
                        </span>
                      </div>
                    </li>
                    <li className="flex justify-between gap-7 py-2 px-1 items-center">
                      <div className="flex gap-7 items-center">
                        <div>
                          <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            aria-expanded="false"
                            data-dropdown-toggle="dropdown-user">
                            <img
                              className="w-8 h-8 rounded-full"
                              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                              alt="user photo"
                            />
                          </button>
                        </div>
                        <div>
                          <p className="font-semibold -0">Nombre</p>
                          <span className="text-sm text-slate-600">
                            correo@gmail.com
                          </span>
                        </div>
                      </div>
                      <div className="pr-6">
                        <span className="font-extrabold text-lg">
                          + 150.000
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default DashboardC;
