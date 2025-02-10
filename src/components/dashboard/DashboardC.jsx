import { CardItems } from "../Cards/CardItems";
import { Box } from "../icons/Box";
import { Time } from "../icons/Time";
import { SendBox } from "../icons/SendBox";
import { Sale } from "../icons/Sale";
import { Users } from "../icons/Users";
import { balances } from "@/services/balances";
import formateValue from "@/utils/formateValue";
import { useEffect, useState } from "react";
import { Graficas } from "./Graficas";
import { Ventas } from "@/components/dashboard/Ventas";

const DashboardC = () => {
  const [response, setResponse] = useState({});
  useEffect(() => {
    const fechtData = async () => {
      const response = await balances();
      setResponse(response);
    };
    fechtData();
  }, []);

  const { users, totalOrders, totalSales, totalPending, totalShipped } =
    response?.data || {};
  const saledsFormater = formateValue(totalSales);

  return (
    <>
      <section className="p-2 sm:ml-64 mt-12 bg-[#f5f6fa] font-">
        <div className="dark:border-gray-700 mt-4 bg-white min-h-screen px-2 ">
          <section className="flex gap-4">
            <div className="flex gap-1 justify-center flex-wrap h-auto py-4 px-2 items-center w-full ">
              <CardItems
                title="Total ordenes"
                value={totalOrders || 0}
                text="Ordenees sin despachar">
                <div className="rounded-full w-10 h-10 md:h-12 md:w-12 flex justify-center items-center p-1 bg-color-a">
                  <Box />
                </div>
              </CardItems>
              <CardItems
                title="Ordenes despachadas"
                value={totalShipped || 0}
                text="Con estado de entregado">
                <div className="rounded-full w-10 h-10 md:h-12 md:w-12 flex justify-center items-center p-1 bg-color-f">
                  <SendBox />
                </div>
              </CardItems>
              <CardItems
                title="Pendientes por envio"
                value={totalPending || 0}
                text="Pendientes">
                <div className="rounded-full w-10 h-10 md:h-12 md:w-12 flex justify-center items-center p-1 bg-color-e">
                  <Time />
                </div>
              </CardItems>
              <CardItems
                title="Total vendido"
                value={Number(saledsFormater) || 0}
                text="Balance total de ventas">
                <div className="rounded-full w-10 h-10 md:h-12 md:w-12 flex justify-center items-center p-1 bg-color-b">
                  <Sale />
                </div>
              </CardItems>
              <CardItems
                title="Total usuarios"
                value={users || 0}
                text="Usuarios e invitados">
                <div className="rounded-full w-10 h-10 md:h-12 md:w-12 flex justify-center items-center p-2 bg-color-c">
                  <Users />
                </div>
              </CardItems>
            </div>
          </section>
          <section className=" grid grid-cols-1 lg:grid-cols-2 gap-3 ">
            <div className="h-auto rounded-md p-2 bg-white shadow">
              <h2 className="text-lg md:text-xl font-semibold pl-1 md:pl-4">
                Productos mas vendidos
              </h2>
              <Graficas />
            </div>
            <div className="rounded-md sm:p-1 p-4 bg-white shadow">
              <Ventas />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default DashboardC;
