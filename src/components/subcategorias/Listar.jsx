import { Table } from "react-bootstrap";

// Listar
export const Listar = ({ categorias }) => {
  return (
    <>
      <div>
        <Table striped bordered hover size="sm" className="table-category">
          <tbody className="tbody-table-category">
            {categorias &&
              categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.nombre}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
