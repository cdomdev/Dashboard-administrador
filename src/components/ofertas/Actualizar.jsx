import { Button, Form, Modal, Row, Col, Spinner } from "react-bootstrap";
import { useState, useRef } from "react";
import { updateOfert } from "../../services/ofertas";

const Actualizar = ({
  oferta,
  setOfertas,
  setBgToast,
  setShowToast,
  setToastMessage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleToast = (bgName, message) => {
    setBgToast(bgName);
    setShowToast(true);
    setToastMessage(message);
    setIsLoading(false);
    setShowModal(false);
  };

  const nombreRef = useRef(null);
  const descuentoRef = useRef(null);
  const fechaIniRef = useRef(null);
  const fechaFinRef = useRef(null);

  const handleInputChange = (e) => {
    e.preventDefault();

    const nombreUPdate = nombreRef.current.value || oferta.nombre;
    const descuentoUpdate = descuentoRef.current.value || oferta.descuento;
    const fechaIniUpdate = fechaIniRef.current.value || oferta.fecha_inicio;
    const fechaFinUpdate = fechaFinRef.current.value || oferta.fecha_fin;

    const updatedValues = {
      nombre: nombreUPdate,
      descuento: descuentoUpdate,
      fechaIni: fechaIniUpdate,
      fechaFin: fechaFinUpdate,
    };
    setUpdatedValues(updatedValues);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await updateOfert(oferta.id, updatedValues);
      if (response.status === 200) {
        setOfertas(response.data.ofertas);
        handleToast("success", "Oferta actualizada con exito");
      }
    } catch (error) {
      console.log("Error al intentar actulizar un oferta", error);
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          handleToast("warning", "No tienes los permisos para esta operación");
        } else if (status === 500) {
          handleToast(
            "danger",
            "Hubo un error intentar actulizar la oferta, inténtelo de nuevo"
          );
        }
      }

      handleToast(
        "danger",
        "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Actualizar
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="font-">
        <Modal.Header closeButton className="py-1">
          <Modal.Title className="text-lg font-bold">
            Actualizar datos de la oferta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-1 px-3">
          <p className="text-base py-2">
            Ingrese los nuevos valores de la oferta
          </p>
          <Form>
            <Form.Control
              ref={nombreRef}
              type="text"
              className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Nombre de la oferta"
              defaultValue={oferta.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
            <Form.Control
              ref={descuentoRef}
              type="number"
              min={1}
              name="descuento"
              max={100}
              placeholder="Porcentaje de descuento"
              className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              defaultValue={oferta.descuento}
              onChange={handleInputChange}
            />
            <Row className="mt-2">
              <Col>
                <Form.Control
                  ref={fechaIniRef}
                  type="date"
                  className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  defaultValue={oferta.fecha_inicio}
                  name="fechaIni"
                  onChange={handleInputChange}
                />
                <Form.Label className="text-xs text-center w-full text-gray-500">
                  Fecha inicial de la oferta
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  ref={fechaFinRef}
                  type="date"
                  className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  defaultValue={oferta.fecha_fin}
                  name="fechaFin"
                  onChange={handleInputChange}
                />
                <Form.Label className="text-xs text-center w-full text-gray-500">
                  Fecha final de la oferta
                </Form.Label>
              </Col>
            </Row>
          </Form>

          <div className="w-full">
            <Button
              variant="primary"
              className="w-full my-3 py-2 text-sm uppercase"
              onClick={handleUpdate}>
              {isLoading ? "Actulizando..." : "Actualizar oferta"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Actualizar;
