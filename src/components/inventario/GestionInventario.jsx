import { useEffect, useState } from "react";
import productos from "../../services/productos";
import "./style.css";
import formateValue from "../../utils/formateValue";
import Editar from "./Editar";
import Actualizar from "./Actualizar";
import Elminar from "./Eliminar";

const GestionInventario = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productos();
        setData(result.productos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="contenedor-inventario">
      {data &&
        data.map((producto) => (
          <div key={producto.id} className="card-product">
            <div className="body">
              <div className="header ">
                <img
                  src={producto.image}
                  alt={producto.nombre}
                  className="w-64"
                />
                <p>{producto.nombre}</p>
              </div>
              <div className="detalles">
                <span>
                  <strong>Marca:</strong>
                  {producto.marca}
                </span>

                <span>
                  <strong>Precio: </strong> $
                  {formateValue(parseInt(producto.valor, 10))}
                </span>
                <span>
                  <strong>Referencia: </strong> {producto.referencia}
                </span>
                <span>
                  <strong>Cantidad en inventario: </strong>
                  {producto.Inventarios.length > 0
                    ? producto.Inventarios[0].cantidad
                    : 0}
                </span>
                <span>
                  <strong>Categoria: </strong>
                  {producto.categoria.nombre || "Sin categoría"}
                </span>
                <span>
                  <strong>Subcategoria: </strong>
                  {producto.subcategoria.nombre || "Sin subcategoría"}
                </span>
                <strong>Descripción:</strong>
                <p>{producto.description}</p>
              </div>
            </div>
            <div className="content-bts">
              <Editar />
              <Actualizar />
              <Elminar />
            </div>
          </div>
        ))}
    </div>
  );
};

export default GestionInventario;
