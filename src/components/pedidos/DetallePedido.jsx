import { getDataStorage } from "@/utils/getDataStorage";
import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import formateValue from "../../utils/formateValue";
import { ModifcarEstado } from "../pedidos/ModifcarEstado";
import { Back } from "../icons/Back";

const DetallePedido = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [estado, setEstado] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    setData(getDataStorage("dataOrderUser"));
    setFilteredData(getDataStorage("dataOrderUser"));
    setUser(getDataStorage(`dataUser`));
  }, []);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setEstado(selectedState);

    if (selectedState) {
      const pedidoFiltrado = data.filter(
        (pedido) => pedido?.estado_pedido === selectedState
      );

      if (pedidoFiltrado.length > 0) {
        setFilteredData(pedidoFiltrado);
      } else {
        setFilteredData([]);
      }
    } else {
      setFilteredData(data);
    }
  };

  console.log(user);
  if (!data || data.length === 0) {
    return (
      <div className="dark:border-gray-700 pt-32 flex justify-center font-text-cust-2">
        <h2>
          {`Algo salio mal al listar los pedidos del usuario ${user.nombre}`}
        </h2>
      </div>
    );
  }

  return (
    <section className="p-2 sm:ml-64 mt-12 bg-[#f5f6fa] min-h-screen font-text-cust-2">
      <div className="dark:border-gray-700 mt-1">
        <section className="mt-4 bg-white  p-2 md:p-4 gap-2 flex flex-col">
          <div className="border py-2 px-5 bg-[#e7e9ed] flex justify-between items-center ">
            <a
              href="/pedidos"
              className="flex text-xs md:text-sm items-center cursor-pointer p-2 rounded-md  text-white shadow-sm duration-150 bg-slate-500 hover:bg-slate-600">
              <Back />
              <p className=" text-[8px] md:text-base"> Volver a los pedidos</p>
            </a>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-xs md:text-sm">Filtrar por: </p>
              <Form>
                <Form.Select
                  className="text-xs md:text-base"
                  aria-label="Default select example"
                  onChange={handleStateChange}
                  value={estado}>
                  <option value="">Seleccione un estado</option>
                  <option value="">Todos los pedidos</option>
                  <option value="alistamiento">En alistamiento</option>
                  <option value="camino">En camino</option>
                  <option value="entregado">Entregados</option>
                </Form.Select>
              </Form>
            </div>
          </div>

          {!Array.isArray(filteredData) || filteredData === null ? (
            <span className="bg-gray-500 w-full">
              <p className="bg-gray-200 text-center py-2 font-semibold">
                Cargando datos...
              </p>
            </span>
          ) : filteredData.length === 0 ? (
            <span className="bg-[#f5f6fa]  w-full">
              <p className="text-center py-2 font-semibold h-full">
                No hay pedidos con ese estado.
              </p>
            </span>
          ) : (
            filteredData.map((order, index) => (
              <div key={order.id || index} className="p-0 md:p-2 border">
                <div className="bg-gray-300 py-2">
                  <h2 className="text-center text-sm md:text-base font-semibold">
                    Detalles de la compra N° {order.id.replaceAll("-", "")}
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
                          <th className="text-xs md:text-sm">Costo de envio</th>
                          <th className="text-xs md:text-sm">Descuento</th>
                          <th className="text-xs md:text-sm">
                            Estado del pago
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-xs md:text-sm capitalize">
                            {order.metodo_de_pago.replaceAll("-", " ")}
                          </td>
                          <td className="text-xs md:text-sm">
                            $: {formateValue(order.pago_total)}
                          </td>
                          <td className="text-xs md:text-sm">
                            {order.detalles_pedido[0]?.cantidad}
                          </td>
                          <td className="text-xs md:text-sm">
                            $: {formateValue(order.costo_de_envio)}
                          </td>
                          <td className="text-xs md:text-sm">
                            {order.detalles_pedido[0]?.descuento}
                          </td>
                          <td className="text-xs md:text-sm">
                            {order.status_mercadopago || "No acreditado"}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <h2 className="text-center pb-2 font-semibold text-sm md:text-base">
                      Datos del comprador
                    </h2>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th className="text-xs md:text-sm">Nombre</th>
                          <th className="text-xs md:text-sm">Correo</th>
                          <th className="text-xs md:text-sm">Telefono</th>
                          <th className="text-xs md:text-sm">Direccion</th>
                          <th className="text-xs md:text-sm">Ciudad</th>
                          <th className="text-xs md:text-sm">Departemento</th>
                          <th className="text-xs md:text-sm">
                            Detalle adicionales
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-xs md:text-sm text-wrap">
                            {user.name || user?.nombre}
                          </td>
                          <td className="text-xs md:text-sm text-wrap">
                            {user?.email}
                          </td>
                          <td className="text-xs md:text-sm text-wrap">
                            {user?.telefono}
                          </td>
                          <td className="text-xs md:text-sm text-wrap">
                            {user?.direccion}
                          </td>
                          <td className="text-xs md:text-sm text-wrap">
                            {user?.ciudad}
                          </td>
                          <td className="text-xs md:text-sm text-wrap">
                            {user?.departamento}
                          </td>
                          <td className="text-xs md:text-sm text-wrap">
                            {user?.detalles}
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
                      className="p-3 max-w-36 md:max-w-48 bg-white flex flex-col items-center rounded-md">
                      <img
                        src={detalle.Producto.image}
                        alt="img"
                        loading="lazy"
                        className="w-20 md:w-32"
                      />
                      <p className="text-[10px] md:text-xs">
                        Ref: {detalle.Producto.referencia}
                      </p>
                      <p className="text-[11px] md:text-sm">
                        {detalle.Producto.nombre}
                      </p>
                      <p className="font-semibold text-sm md:text-base">
                        $: {formateValue(parseFloat(detalle.precio_unitario))}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-200 mt-2 p-2">
                  <ModifcarEstado pedido={order} user={user} />
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </section>
  );
};

export default DetallePedido;
