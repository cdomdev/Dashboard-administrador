import { Table } from "react-bootstrap";
import { listarSub } from "@/services/subcategorias";
import { useEffect } from "react";

export const Listar = ({ subcategorias, setSubcategorias }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listarSub();
        setSubcategorias(result.categorias);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {!subcategorias || subcategorias.length === 0 ? (
        <p className="text-sm md:text-base text-center">No hay subcategorias para listar</p>
      ) : (
        <Table striped bordered hover size="sm" className="table-category">
          <tbody className="tbody-table-category">
            {subcategorias &&
              subcategorias.map((subcategoria) => (
                <tr key={subcategoria.id}>
                  <td className="text-sm md:text-base">{subcategoria.nombre}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}

    </>
  );
};
