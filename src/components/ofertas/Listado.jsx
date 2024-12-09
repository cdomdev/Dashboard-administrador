import formatedDate from "../../utils/formatedDate";
import Eliminar from "./Eliminar";
import Actualizar from "./Actualizar";
import { useEffect } from "react";
import { listar } from "../../services/ofertas";
import { Accordion } from "react-bootstrap";

const Listado = ({
  ofertas,
  setOfertas,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listar();
        if (result && result.ofertas.length > 0) {
          setOfertas(result.ofertas)
        } else {
          setOfertas([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="section-listado-ofertas">
      <h4 className="text-lg font-semibold mb-2 bg-white px-2 py-1 shadow-sm rounded-sm">
        Ofertas vigentes
      </h4>
      <Accordion defaultActiveKey="0" >
        {ofertas.length === 0 || ofertas === "No hay ofertas disponibles" ? (
          <div className="w-full bg-white py-3 px-2">
            <p className="text-center text-base font-semibold">
              No hay ofertas disponibles
            </p>
          </div>
        ) : (
          ofertas.map((oferta, index) => (
            <Accordion.Item key={oferta.id} eventKey={index} className="border-none shadow-sm">
              <Accordion.Header>
                <strong className="uppercase font-bold">{oferta.nombre}</strong>
              </Accordion.Header>
              <Accordion.Body className=" block visible">
                <div className="flex gap-3 flex-col md:flex-row">
                  <div className=" p-1">
                    <strong>Descuento: </strong>
                    <strong className="sale">{oferta.descuento}%</strong>
                    <p className="font-semibold">Fecha de inicio:</p>
                    <p className="text-blue-700 font-semibold">
                      {formatedDate(oferta.fecha_inicio)}
                    </p>
                    <p className="font-semibold">Fecha de fin:</p>
                    <p className="text-red-600 font-semibold">
                      {formatedDate(oferta.fecha_fin)}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-producto-oferta bg-slate-300 p-2  text-center text-base font-semibold">
                      Productos relacionados a la oferta
                    </h5>
                    <ul className="mt-2 list-disc px-3">
                      {oferta.Productos && oferta.Productos.length > 0 ? (
                        oferta.Productos.map((producto) => (
                          <li key={producto.id}>{producto.nombre}</li>
                        ))
                      ) : (
                        <li>No hay productos disponibles</li>
                      )}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <Eliminar
                      oferta={oferta}
                      setOfertas={setOfertas}
                      setBgToast={setBgToast}
                      setShowToast={setShowToast}
                      setToastMessage={setToastMessage}
                    />
                    <Actualizar
                      oferta={oferta}
                      setOfertas={setOfertas}
                      setBgToast={setBgToast}
                      setShowToast={setShowToast}
                      setToastMessage={setToastMessage}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))
        )}
      </Accordion>
    </div>
  );
};

export default Listado;
