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
    <div>
      {
        categorias && categorias.lenght > 0 ? (
          <Table
            striped
            bordered
            hover
            size="sm"
            responsive
            className="table-category">
            <tbody className="tbody-table-category">
              {categorias & categorias.lenght === 0 ??
                (categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td className="text-sm md:text-base">{categoria.nombre}</td>
                  </tr>
                )))}
            </tbody>
          </Table>
        ) : <p className="text-sm  lg:text-base text-center">Parce que no hay cactegorias por listar</p>
      }

    </div>
  );
};
