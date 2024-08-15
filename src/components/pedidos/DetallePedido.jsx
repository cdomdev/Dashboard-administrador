import { getDataStorage } from "@/utils/getDataStorage";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import formateValue from "../../utils/formateValue";
import { ModifcarEstado } from "./ModifcarEstado";

const DetallePedido = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    setUser(getDataStorage("dataUserOrders"));
    setData(getDataStorage("dataOrdersUser"));
  }, []);

  return (
    <section className="mt-3 bg-white min-h-screen p-2 md:p-4 gap-5 flex flex-col">
      {!Array.isArray(data) || data.length === 0 ? (
        <span className="bg-gray-500 w-full">
          <p className="bg-gray-200 text-center py-2 font-semibold">
            Cargando datos...
          </p>
        </span>
      ) : (
        data.map((order, index) => (
          <div key={order.id || index} className=" p-0 md:p-2 border">
            <div className=" bg-gray-300 py-2">
              <h2 className="text-center text-sm md:text-base font-semibold">
                Detalles de la compra N° {index + 1}
              </h2>
            </div>
            <div className="info-user">
              <div className="bg-[#f5f6fa] p-2">
                <Table striped bordered hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th className="text-xs md:text-sm">Método de Pago</th>
                      <th className="text-xs md:text-sm">Total pagado</th>
                      <th className="text-xs md:text-sm">Cantidad</th>
                      <th className="text-xs md:text-sm">Descuento</th>
                      <th className="text-xs md:text-sm">Estado del pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-xs md:text-sm">
                        {order.detalles_pedido[0]?.metodo_pago}
                      </td>
                      <td className="text-xs md:text-sm">
                        {formateValue(
                          parseFloat(order.detalles_pedido[0]?.total_pago)
                        )}
                      </td>
                      <td className="text-xs md:text-sm">
                        {order.detalles_pedido[0]?.cantidad}
                      </td>
                      <td className="text-xs md:text-sm">
                        {order.detalles_pedido[0]?.descuento}
                      </td>
                      <td className="text-xs md:text-sm">
                        {order.detalles_pedido[0]?.status_detail ||
                          "No acreditado"}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <h2 className="text-center pb-2 font-semibold text-sm md:text-base">
                  Datos del comprador{" "}
                </h2>
                <Table striped bordered hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th className="text-xs md:text-sm">Nombre</th>
                      <th className="text-xs md:text-sm">Correo</th>
                      <th className="text-xs md:text-sm">Telefono</th>
                      <th className="text-xs md:text-sm">Direccion</th>
                      <th className="text-xs md:text-sm">
                        Detalle adicionales
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-xs md:text-sm text-wrap">
                        {user.name || user.nombre}
                      </td>
                      <td className="text-xs md:text-sm text-wrap">
                        {user.email}
                      </td>
                      <td className="text-xs md:text-sm text-wrap">
                        {user.telefono}
                      </td>
                      <td className="text-xs md:text-sm text-wrap">
                        {user.direccion}
                      </td>
                      <td className="text-xs md:text-sm text-wrap">
                        {user.detalles}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
            <h3 className="text-center text-sm md:text-base font-semibold m-3 p-0">
              Productos
            </h3>
            <div className="bg-[#f5f6fa] p-2 flex flex-col md:flex-row gap-2">
              {order.detalles_pedido.map((detalle, index) => (
                <div
                  key={index}
                  className="p-3 max-w-36 md:max-w-48 bg-white flex flex-col  items-center rounded-md">
                  <img
                    src={detalle.Producto.image}
                    alt="img"
                    loading="lazy"
                    className="w-20 md:w-32 "
                  />
                  <p className=" text-[10px] md:text-xs">
                    Ref: {detalle.Producto.referencia}
                  </p>
                  <p className=" text-[11px] md:text-sm">
                    {detalle.Producto.nombre}
                  </p>
                  <p className="font-semibold text-sm md:text-base">
                    $: {formateValue(parseFloat(detalle.precio_unitario))}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-gray-200 mt-2 p-2">
              <ModifcarEstado pedido={order} />
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default DetallePedido;
