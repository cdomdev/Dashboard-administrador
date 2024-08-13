import { useEffect } from "react";
import  Editar  from "./Editar";
import  Delete  from "./Delete";
import getDataStorage from "../../utils/getDataStorage";
import  formateValue  from "../../utils/formateValue";

 const Listado = ({ listadoState, setListadoState }) => {
  // useEffect(() => {
  //   if(!getDataStorage("productos")){
  //     return []
  //   }else{
  //     setListadoState(getDataStorage("productos"));
  //   }
  // }, []);


  return (
    <>

      {listadoState != null ? (
        listadoState.map((producto, index) => {
          return (
            <article key={producto.id || index} className="container-card">
              <div className="productos-cards">
                {producto.image && <img src={producto.image} alt="Preview" />}
                <div className="details">
                  <span>
                    <strong>Marca: </strong>
                    {producto.marca}
                  </span>
                  <span>
                    <strong>Nombre: </strong>
                    {producto.nombre}
                  </span>
                  <span>
                    <strong>Valor: $ </strong>
                    {formateValue(parseInt(producto.valor))}
                  </span>
                  <span>
                    <strong>Cantidad: </strong>
                    {producto.cantidad}
                  </span>
                  <span>
                    <strong>Referencia: </strong>
                    {producto.referencia}
                  </span>
                  <span>
                    <strong>Categoria: </strong>
                    {producto.categoria}
                  </span>
                  <span>
                    <strong>Subcategoria: </strong>
                    {producto.subcategoria}
                  </span>
                  <strong>Descripción:</strong>
                  <p className="description">{producto.description}</p>
                </div>
                <div className="content-btn-card">
                  <Editar
                    producto={producto}
                    setListadoState={setListadoState}
                  />
                  <Delete id={producto.id} setListadoState={setListadoState} />
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <div className="contendor-alter-products-card d-flex text-center bg-white h-full w-full">
          <span className="m-auto text-base font-medium">
            Agregue nuevos productos para verlos aquí.
          </span>
        </div>
      )}
    </>
  );
};

export default Listado;