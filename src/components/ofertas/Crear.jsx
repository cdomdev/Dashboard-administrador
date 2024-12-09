import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { PopoverProductos } from "./PopoverProductos";
import { createOfert, productosPopover } from "../../services/ofertas";

const Crear = ({ setOfertas, setBgToast, setShowToast, setToastMessage }) => {
  const [listaProductos, setListaProductos] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [oferta, setOferta] = useState({
    nombre: "",
    descuento: "",
    fechaIni: "",
    fechaFin: "",
  });

  useEffect(() => {
    const fechData = async () => {
      const responseProduct = await productosPopover();
      setListaProductos(responseProduct.data);
    };

    fechData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOferta({
      ...oferta,
      [name]: value,
    });
  };

  const handleProductSelection = (e, product) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      const updatedSelections = selectedProducts.filter(
        (selectedProduct) => selectedProduct.id !== product.id
      );
      setSelectedProducts(updatedSelections);
    }
  };

  const handleToast = (bgName, message) => {
    setBgToast(bgName);
    setShowToast(true);
    setToastMessage(message);
    setIsloading(false);
  };

  const handleNuevaOferta = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const { nombre, descuento, fechaIni, fechaFin } = oferta;

    if (
      !nombre ||
      !descuento ||
      !fechaIni ||
      !fechaFin ||
      selectedProducts.length === 0
    ) {
      handleToast("warning", "Faltan datos para crear una oferta");
      return;
    }
    try {
      const newOferta = {
        nombre: nombre,
        descuento: parseInt(descuento),
        fechaIni: moment(fechaIni).format("DD-MM-YYYY"),
        fechaFin: moment(fechaFin).format("DD-MM-YYYY"),
        productos: selectedProducts,
      };

      const ofertResponse = await createOfert(newOferta);
      if (ofertResponse.status === 201) {
        setOfertas(ofertResponse.data.ofertas);
        setSelectedProducts("");
        setOferta("");
        handleToast("success", "Se agrego una nueva oferta");
      }

      setOferta({
        nombre: "",
        descuento: "",
        fechaIni: "",
        fechaFin: "",
      });
    } catch (error) {
      console.error("Error en la creacion de la oferta:", error);
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          setBgToast("warning");
          setIsloading(false);
          setToastMessage("No tienes los permisos para esta operación");
          setShowToast(true);
        } else if (status === 500) {
          handleToast(
            "danger",
            "Hubo un error crear una nueva oferta, inténtelo de nuevo"
          );
        }
        handleToast(
          "danger",
          "Ocurrió un error inesperado. Por favor, intenta de nuevo más tarde"
        );
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className=" bg-white p-3  rounded-sm shadow-sm">
      <h4 className="text-base md:text-lg text-center font-semibold">
        Crear una nueva oferta
      </h4>
      <p className="text-sm">
        Aqui podra agragar ofertas a los productos existentes,
        <strong> (Marca - producto - cantidad).</strong>
      </p>
      <Form className="mt-2" onSubmit={handleNuevaOferta}>
        <Form.Label className="mb-1 text-sm">Nombre de la oferta</Form.Label>
        <Form.Control
          type="text"
          placeholder="Black Friday"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          value={oferta.nombre}
          onChange={handleInputChange}
          name="nombre"
        />
        <Form.Label className="my-1 text-sm">
          Porcentaje de descuento
        </Form.Label>
        <Form.Control
          type="number"
          min={1}
          max={100}
          placeholder="5"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          value={oferta.descuento}
          onChange={(e) => setOferta({ ...oferta, descuento: e.target.value })}
        />
        <Row className="mt-2">
          <Col>
            <Form.Label className="my-1 text-sm">
              Fecha inicial de la oferta
            </Form.Label>
            <Form.Control
              type="date"
              value={oferta.fechaIni}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="fechaIni"
              onChange={handleInputChange}
            />
          </Col>
          <Form.Label className="label-date my-1 text-sm">
            Fecha final de la oferta
          </Form.Label>
          <Col>
            <Form.Control
              type="date"
              value={oferta.fechaFin}
              name="fechaFin"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <div className="w-full mt-3 flex">
          <PopoverProductos
            listaProductos={listaProductos}
            handleProductSelection={handleProductSelection}
            selectedProducts={selectedProducts}
          />
        </div>
        <div className="w-full">
          <Button className="mt-4 w-full text-sm uppercase py-2" type="submit">
            {isLoading ? "Creando oferta..." : "Crear nueva oferta"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Crear;
