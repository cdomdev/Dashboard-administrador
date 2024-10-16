import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getUserForList } from "@/services/users";
import { DeleteUser } from "./DeleteUser";
import { ProfileDef } from "./ProfileDef";

const ListUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fechData = async () => {
            const lisUsers = await getUserForList()
            if (users) {
                const { users } = lisUsers
                setUsers(users)
            }
        }
        fechData()
    }, [])

    const isValidURL = (url) => {
        new URL(url) ? true : false;
    };

    return (
        <div className="relative overflow-x-auto  sm:rounded-lg">
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Departamento</th>
                        <th>Ciudad</th>
                        <th>Rol </th>
                        <th>Estado</th>
                        <th><span className="text-red-600">Eliminar</span></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <>
                            <tr>
                                <td>
                                    {
                                        user.picture ? (
                                            <img src={user.picture} alt="profile-useer" className="border size-8 rounded-full" />
                                        ) : (
                                            <ProfileDef />
                                        )
                                    }

                                </td>
                                <td className="text-sm md:text-base">{user.nombre}</td>
                                <td className="text-sm md:text-base">{user.email}</td>
                                <td className="text-sm md:text-base">{user.departamento || 'Sin informacion'}</td>
                                <td className="text-sm md:text-base">{user.ciudad || 'Sin informacion'}</td>
                                <td className="text-sm md:text-base">{user.roles.rol_name}</td>
                                <td className="text-sm md:text-base">Activo</td>
                                <td className="text-sm md:text-base"><DeleteUser /></td>
                            </tr>
                        </>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}

export default ListUsers;