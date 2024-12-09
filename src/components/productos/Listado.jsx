import { useEffect } from "react";
import Editar from "./Editar";
import { ModalDelete } from "./Delete";
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
            <article key={producto.id || index}>
              <div className="w-[350px] bg-white h-auto shadow-sm justify-center rounded-lg p-2 flex flex-col items-center  ">
                {producto.image && (
                  <img
                    src={producto.image}
                    alt="Preview"
                    className="w-36 bg-white"
                    loading="lazy"
                  />
                )}
                <div className="flex flex-col w-full p-2 ">
                  <span className="text-sm">
                    <strong className="text-sm">Marca: </strong>
                    {producto.marca}
                  </span>
                  <span className="text-sm">
                    <strong className="text-sm">Nombre: </strong>
                    {producto.nombre}
                  </span>
                  <span>
                    <strong className="text-sm">Valor: $ </strong>
                    {formateValue(producto.valor)}
                  </span>
                  <span className="text-sm">
                    <strong className="text-sm">Cantidad: </strong>
                    {producto.cantidad}
                  </span>
                  <span>
                    <strong className="text-sm">Referencia: </strong>
                    {producto.referencia}
                  </span>
                  <span className="text-sm">
                    <strong className="text-sm">Categoria: </strong>
                    {producto.categoria}
                  </span>
                  <span className="text-sm">
                    <strong className="text-sm">Subcategoria: </strong>
                    {producto.subcategoria}
                  </span>
                  <strong className="text-sm">Descripción:</strong>
                  <p className="text-wrap max-h-44 overflow-y-auto">
                    {producto.description}
                  </p>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Editar
                    producto={producto}
                    setListado={setListado}
                    setBgToast={setBgToast}
                    setShowToast={setShowToast}
                    setToastMessage={setToastMessage}
                  />
                  <ModalDelete
                    id={producto.id}
                    setListado={setListado}
                    setBgToast={setBgToast}
                    setShowToast={setShowToast}
                    setToastMessage={setToastMessage}
                    producto={producto}
                  />
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <div className="contendor-alter-products-card d-flex text-center bg-white h-full w-full">
          <span className="m-auto text-sm font-semibold md:text-lg text-gray-400">
            Agregue nuevos productos para verlos aquí.
          </span>
        </div>
      )}
    </>
  );
};

export default Listado;
