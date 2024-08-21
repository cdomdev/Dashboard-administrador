import { useEffect, useState } from "react";
import Editar from "./Editar";
import Delete from "./Delete";
import { getDataStorage } from "../../utils/getDataStorage";
import formateValue from "../../utils/formateValue";

const Listado = ({
  listado,
  setListado,
  setBgToast,
  setToastMessage,
  setShowToast,
}) => {
  useEffect(() => {
    setListado(getDataStorage("productos"));
  }, []);

  return (
    <>
      {listado != null ? (
        listado.map((producto, index) => {
          return (
            <article key={producto.id || index} className="">
              <div className="w-56 bg-white h-auto max-w-72 shadow-sm justify-center rounded-lg p-2 flex flex-col items-center  ">
                {producto.image && (
                  <img
                    src={producto.image}
                    alt="Preview"
                    className="w-36 bg-white"
                    loading="lazy"
                  />
                )}
                <div className="flex flex-col w-full p-2 ">
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
                    {formateValue(producto.valor)}
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
                  <p className="text-wrap">{producto.description}</p>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Editar
                    producto={producto}
                    setListado={setListado}
                    setBgToast={setBgToast}
                    setShowToast={setShowToast}
                    setToastMessage={setToastMessage}
                  />
                  <Delete
                    id={producto.id}
                    setListado={setListado}
                    setBgToast={setBgToast}
                    setShowToast={setShowToast}
                    setToastMessage={setToastMessage}
                  />
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <div className="contendor-alter-products-card d-flex text-center bg-white h-full w-full">
          <span className="m-auto text-lg font-medium">
            Agregue nuevos productos para verlos aquí.
          </span>
        </div>
      )}
    </>
  );
};

export default Listado;
