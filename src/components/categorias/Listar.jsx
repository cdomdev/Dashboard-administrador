import { Table } from "react-bootstrap";
import { useEffect } from "react";
import { listarCat } from "../../services/categorias";

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
    <>
    <h2 className="mb-2 text-base md:text-lg font-semibold">Lista de categorias</h2>
      {
        !categorias || categorias.length === 0 ? (
          <p className="text-center text-sm md:text-base">No hay categorias por listar </p>
        ) :
          <Table
            striped
            bordered
            hover
            size="sm"
            responsive
          >
            <tbody className="tbody-table-category">
              {(categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td className="text-sm md:text-base">{categoria.nombre}</td>
                </tr>
              ))
              )
              }
            </tbody>
          </Table>
      }
    </>
  );
};
