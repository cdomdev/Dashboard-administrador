import { useState } from "react";
import { Table } from "react-bootstrap";
import listar from "../../services/pedidos";
import { useEffect } from "react";
import { Pedidos } from "./Pedidos";
import { checkSession } from "@/utils/checkSession";

const ListadoPedidos = () => {
  const [pedidos, setPedidos] = useState(null);

  useEffect(() => {
    const sesion = checkSession();
    const fetchData = async () => {
      try {
        const response = await listar();
        setPedidos(response.listaPedidos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    if (!sesion) {
      window.location.href = "/";
    }
  }, []);

  return (
    <section className="p-2 sm:ml-64 mt-12 bg-[#f5f6fa] min-h-screen">
      <div className="dark:border-gray-700 mt-1">
        <div className="w-full pt-2 bg-white p-3 min-h-screen mt-3">
          <h2 className="text-center mt-3 mb-1 border py-2 bg-[#1976d2] text-white text-lg">
            Listado de usuarios pedidos
          </h2>
          {pedidos !== null ? (
            <Table striped bordered hover size="sm" responsive>
              <thead>
                <tr>
                  <th className="thead-table-users">N°orden</th>
                  <th className="thead-table-users">Nombre</th>
                  <th className="thead-table-users">E-mail</th>
                  <th className="thead-table-users">Rol del usuario</th>
                  <th className="thead-table-users">Pedidos</th>
                </tr>
              </thead>
              <tbody>
                {pedidos
                  .filter((usuario) => usuario.tienePedidos)
                  .map((usuario, index) => (
                    <tr key={usuario.id || index}>
                      <td>{index + 1}</td>
                      <td>{usuario.name || usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.roles?.rol_name || usuario.role}</td>
                      <td>
                        {usuario.roles?.rol_name === "user" ? (
                          <Pedidos user={usuario} ruta={"pedidos-usuario"} />
                        ) : (
                          <Pedidos user={usuario} ruta={"pedidos-invitado"} />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            <div className="w-full border flex items-center justify-center p-2">
              <p className="text-center text-base">Cargando pedidos...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListadoPedidos;
