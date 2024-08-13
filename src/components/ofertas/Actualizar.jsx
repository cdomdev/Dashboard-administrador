import { Button, Form, Modal, Row, Col, Spinner } from "react-bootstrap";
import { useState, useRef } from "react";

const Actualizar = ({ oferta, setOferta }) => {
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

    const nombreUPdate = nombreRef.current.value || ofertaData.nombre;
    const descuentoUpdate = descuentoRef.current.value || ofertaData.descuento;
    const fechaIniUpdate = fechaIniRef.current.value || ofertaData.fecha_inicio;
    const fechaFinUpdate = fechaFinRef.current.value || ofertaData.fecha_fin;

    const updatedValues = {
      nombre: nombreUPdate,
      descuento: descuentoUpdate,
      fechaIni: fechaIniUpdate,
      fechaFin: fechaFinUpdate,
    };
    setUpdatedValues(updatedValues);
    // Actualizar el estado con el nuevo objeto
  };

  const handleUpdate = async () => {
    // Realizar la solicitud para actualizar la oferta
    setIsLoading(true);
    try {
      if (!ofertaData || !updatedValues) {
        setToastMessage("No hay datos para actulzar la oferta");
        setBgToast("danger");
        setShowToast(true);
      }
      await api
        .put(`${API_HOST}/api/oferta/update/${ofertaData.id}`, {
          oferta_id: ofertaData.id,
          updatedValues: updatedValues,
        })
        .then((response) => {
          if (response.status === 200) {
            setOfertaListado(response.data.ofertas);
            setToastMessage("Oferta actualizada con exito");
            setBgToast("success");
            setShowToast(true);
            setTimeout(() => {
              setShowModal(false);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 403) {
            setToastMessage("No tienes permisos para esta operacion");
            setBgToast("danger");
            setShowToast(true);
          }
          setToastMessage("No se pudo crear la oferta, intentalo de nuevo");
          setBgToast("danger");
          setShowToast(true);
        });
    } catch (error) {
      console.log("Error al intentar actulizar un oferta", error);
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
        <Modal.Header closeButton className="header-modal-update">
          <Modal.Title className="title-modal-update">
            Modificar oferta
          </Modal.Title>
        </Modal.Header>
        <p className="text-ofertas">Ingrese los nuevos valores de la oferta</p>
        <div className="body-modal-ofertas-update">
          <Form className="mt-4">
            <Form.Control
              ref={nombreRef}
              type="text"
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
              className="mt-2"
              defaultValue={oferta.descuento}
              onChange={handleInputChange}
            />
            <Row className="mt-2">
              <Col>
                <Form.Control
                  ref={fechaIniRef}
                  type="date"
                  defaultValue={oferta.fecha_inicio}
                  name="fechaIni"
                  onChange={handleInputChange}
                />
                <Form.Label className="label-date">
                  Fecha inicial de la oferta
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  ref={fechaFinRef}
                  type="date"
                  defaultValue={oferta.fecha_fin}
                  name="fechaFin"
                  onChange={handleInputChange}
                />
                <Form.Label className="label-date">
                  Fecha final de la oferta
                </Form.Label>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="content-button-ofertas">
          <Button variant="primary" onClick={handleUpdate}>
            {isLoading ? (
              <div className="spinner-container">
                <Spinner animation="border" role="status" size="sm" />
              </div>
            ) : (
              <> Actualizar oferta</>
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Actualizar;
