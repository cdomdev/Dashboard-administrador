import { Table } from "react-bootstrap";

const ListUsers = () => {
    return (
        <main>
            <section className="p-2 sm:ml-64 mt-20 bg-[#f5f6fa] min-h-screen">
                <header>
                    <div className="w-full text-md text-black dark:text-gray-400 py-2 text-center shadow-sm bg-white mb-2 rounded-lg">
                        Aqui datos como filtros
                    </div>
                </header>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Ciudad</th>
                                <th>Rol </th>
                                <th>Activo</th>
                                <th>Quitar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Carlos</td>
                                <td>carlos@gmail.com</td>
                                <td>Bogota</td>
                                <td>usuario <span className="text-sm text-blue-400 cursor-pointer">Editar</span> </td>
                                <td>true </td>
                                <td><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash-x size-8" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 7h16" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    <path d="M10 12l4 4m0 -4l-4 4" />
                                </svg></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </section>
        </main>
    )
}

export default ListUsers;