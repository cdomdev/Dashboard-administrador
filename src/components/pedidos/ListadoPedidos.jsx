import { useState } from "react";
import { Table } from "react-bootstrap";
import { listar } from "../../services/pedidos";
import { useEffect } from "react";
import { Pedidos } from "./Pedidos";
import { Database } from "../icons/Database";
import { ModalMessage } from "./ModalMessage";

const ListadoPedidos = () => {
  const [pedidos, setPedidos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listar();
        setPedidos(response.listaPedidos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="p-2 sm:ml-64 mt-12 bg-[#f5f6fa] min-h-dvh font-">
      <div className="dark:border-gray-700 mt-1">
        <div className="w-full pt-2 bg-white p-3 min-h-screen mt-4 ">
          <h2 className="text-center mt-3 mb-2 rounded-sm py-2 bg-[#5252d4] font-semibold shadow-sm text-[#e3e3e3] text-lg">
            Listado de pedidos
          </h2>
          {!pedidos || pedidos.length === 0 ? (
            <div className="w-full  flex flex-col items-center justify-center p-2">
              <Database />
              <p className="text-center text-base">No hay pedidos</p>
            </div>
          ) : (
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th className="thead-table-users">Ref de orden</th>
                  <th className="thead-table-users">Nombre</th>
                  <th className="thead-table-users">Email</th>
                  <th className="thead-table-users">Rol del usuario</th>
                  <th className="thead-table-users">Ver Pedidos</th>
                  <th className="thead-table-users">Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {pedidos
                  .filter((usuario) => usuario.tienePedidos)
                  .map((usuario, index) => (
                    <tr key={usuario.id || index}>
                      <td>{usuario.id.slice(-12)}</td>
                      <td>{usuario.name || usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td className="capitalize">
                        {usuario.roles?.rol_name || usuario.role}
                      </td>
                      <td>
                        {usuario.roles?.rol_name === "usuario" ? (
                          <Pedidos user={usuario} ruta={"pedidos-usuario"} />
                        ) : (
                          <Pedidos user={usuario} ruta={"pedidos-invitado"} />
                        )}
                      </td>
                      <td>
                        <ModalMessage usuario={usuario} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListadoPedidos;
