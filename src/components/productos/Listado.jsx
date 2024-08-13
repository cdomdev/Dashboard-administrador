import { useEffect } from "react";
import Editar from "./Editar";
import Delete from "./Delete";
import formateValue from "../../utils/formateValue";
import getDataStorage from "../../utils/getDataStorage";

const Listado = ({ listado, setListado }) => {
  // useEffect(() => {
  //   setListado(getDataStorage("productos"));
  // }, []);

  return (
    <>
      {/* {listadoState != null ? (
        listadoState.map((producto, index) => {
          return ( */}
      <div className="bg-white w-full h-full p-4 rounded-sm">
        <div className="flex flex-col w-64 h-auto p-3 items-center justify-center rounded-md">
          <img src={""} alt="Preview" className="w-full h-full" />
          <div className="flex flex-col justify-start w-full">
            <span>
              <strong>Marca: </strong>
              {/* {producto?.marca} */}
            </span>
            <span>
              <strong>Nombre: </strong>
              {/* {producto?.nombre} */}
            </span>
            <span>
              <strong>Valor: $ </strong>
              {/* {formateValue(parseInt(producto?.valor))} */}
            </span>
            <span>
              <strong>Cantidad: </strong>
              {/* {producto?.cantidad} */}
            </span>
            <span>
              <strong>Referencia: </strong>
              {/* {producto?.referencia} */}
            </span>
            <span>
              <strong>Categoria: </strong>
              {/* {producto?.categoria} */}
            </span>
            <span>
              <strong>Subcategoria: </strong>
              {/* {producto?.subcategoria} */}
            </span>
            <strong>Descripción:</strong>
            <p className="description">producto</p>
          </div>
          {/* <div className="content-btn-card">
            <Editar producto={producto} setListadoState={setListadoState} />
            <Delete id={producto?.id} setListadoState={setListadoState} />
          </div> */}
        </div>
      </div>
      {/* );
        })
      ) : (
        <div className="contendor-alter-products-card d-flex text-center">
          <span className="text-center text-shadow " style={{ margin: "auto" }}>
            Agregue nuevos productos para verlos aquí.
          </span>
        </div>
      )} */}
    </>
  );
};

export default Listado;
