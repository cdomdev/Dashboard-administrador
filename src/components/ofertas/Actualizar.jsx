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
        setShowModal(false);
        setBgToast("success");
        setToastMessage("Oferta actualizada con exito");
        setShowToast(true);
      }
    } catch (error) {
      console.log("Error al intentar actulizar un oferta", error);
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          setBgToast("warning");
          setToastMessage("No tienes los permisos para esta operación");
          setShowToast(true);
          setShowModal(false);
        } else if (status === 500) {
          setBgToast("danger");
          setToastMessage(
            "Hubo un error intentar actulizar la oferta, inténtelo de nuevo"
          );
          setShowToast(true);
          setShowModal(false);
        } else {
          setBgToast("danger");
          setToastMessage(
            "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde."
          );
          setShowToast(true);
        }
      }
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
        className="modal-ofertas-update">
        <Modal.Header closeButton className="py-1">
          <Modal.Title className="text-lg font-bold">
            Actualizar datos de la oferta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-1 px-3">
          <p className="text-base font-semibold py-2">
            Ingrese los nuevos valores de la oferta
          </p>
          <Form>
            <Form.Control
              ref={nombreRef}
              type="text"
              className=" focus:outline-none shadow-none focus:border-slate-300  rounded-md  border-gray-200"
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
              className="mt-2 focus:outline-none shadow-none focus:border-slate-300  rounded-md  border-gray-200"
              defaultValue={oferta.descuento}
              onChange={handleInputChange}
            />
            <Row className="mt-2">
              <Col>
                <Form.Control
                  ref={fechaIniRef}
                  type="date"
                  className="focus:outline-none shadow-none focus:border-slate-300  rounded-md  border-gray-200"
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
                  className="focus:outline-none shadow-none focus:border-slate-300  rounded-md  border-gray-200"
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
              className="w-full my-3"
              onClick={handleUpdate}>
              {isLoading ? (
                <div className="spinner-container">
                  <Spinner animation="border" role="status" size="sm" />
                </div>
              ) : (
                <> Actualizar oferta</>
              )}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Actualizar;
