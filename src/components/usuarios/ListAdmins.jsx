import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { DeleteUser } from "./DeleteUser";
import { ProfileDef } from "./ProfileDef";
import { Edit } from "./Edit";
import { getAllsAdmin } from "@/services/users";
const ListAdmins = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fechData = async () => {
      const lisUsers = await getAllsAdmin();
      if (users) {
        const { users } = lisUsers.data;
        setUsers(users);
      }
    };
    fechData();
  }, []);

  return (
    <>
      {users && users.length > 0 ? (
        <div className="relative overflow-x-auto  sm:rounded-lg">
          <Table striped responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Departamento</th>
                <th>Ciudad</th>
                <th>Rol </th>
                <th>
                  <span>Estado de usuario</span>
                </th>
                <th>
                  <span className="text-red-600 justify-center flex">
                    Eliminar
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt="profile-useer"
                        className="border size-8 rounded-full"
                      />
                    ) : (
                      <ProfileDef />
                    )}
                  </td>
                  <td className="text-xs md:text-sm">{user.nombre}</td>
                  <td className="text-xs md:text-sm">{user.email}</td>
                  <td className="text-xs md:text-sm">
                    {user.departamento || "Sin datos"}
                  </td>
                  <td className="text-xs md:text-sm">
                    {user.ciudad || "Sin datos"}
                  </td>
                  <td className="text-xs md:text-sm">
                    {user?.roles?.rol_name || "Invitado"}
                  </td>
                  <td className="text-sm md:text-sm">
                    <span>
                      <Edit user={user} setUsers={setUsers} />{" "}
                    </span>{" "}
                  </td>
                  <td className="text-xs md:text-sm">
                    <span className="flex justify-center">
                      <DeleteUser user={user} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="text-center w-full text-gray-400 bg-white py-2 shadow-sm">
          <p>No hay datos para listar</p>
        </div>
      )}
    </>
  );
};

export default ListAdmins;
