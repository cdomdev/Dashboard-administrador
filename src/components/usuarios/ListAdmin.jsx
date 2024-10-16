import { Table } from "react-bootstrap";

const ListAdmin = () => {
    return (
        <div className="relative overflow-x-auto">
            <Table striped>
                <thead>
                    <tr>
                        <th >#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Ciudad</th>
                        <th>Rol </th>
                        <th>Estado</th>
                        <th>Quitar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >1</td>
                        <td >Carlos</td>
                        <td >carlos@gmail.com</td>
                        <td >Bogota</td>
                        <td >Administrador</td>
                        <td >Activo</td>
                        <td ><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash-x size-8" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
    )
}

export default ListAdmin;