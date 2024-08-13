import { Table } from "react-bootstrap";
import { useEffect } from "react";
import { listarCat } from "@/services/categorias";


export const Listar = ({ categorias, setCategorias }) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listarCat();
        setCategorias(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
      <div>
        <Table
          striped
          bordered
          hover
          size="sm"
          responsive
          className="table-category">
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
  );
};
