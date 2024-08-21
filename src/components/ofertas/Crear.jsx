import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { PopoverProductos } from "./PopoverProductos";
import { createOfert, productosPopover } from "../../services/ofertas";

const Crear = ({ setOfertas, setBgToast, setShowToast, setToastMessage }) => {
  const [listaProductos, setListaProductos] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
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

  // tomar valores de los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOferta({
      ...oferta,
      [name]: value,
    });
  };

  // sleccion del id del la lista de productos
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

  // hacer la solcitud con validaciones antes de enviar los datos
  const handleNuevaOferta = async (e) => {
    e.preventDefault();

    const { nombre, descuento, fechaIni, fechaFin } = oferta;

    if (!nombre || !descuento || !fechaIni || !fechaFin) {
      setBgToast("warning");
      setShowToast(true);
      setToastMessage("Faltan datos para crear una oferta");
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
        setBgToast("success");
        setShowToast(true);
        setToastMessage("Se agrego una nueva oferta");
      } else {
        console.log("no se pudo crear la oferta");
      }
      setOferta({
        nombre: "",
        descuento: "",
        fechaIni: "",
        fechaFin: "",
      });
    } catch (error) {
      console.log("Error en la creacion de la oferta:", error);
    }
  };

  return (
    <div className=" bg-white p-3  rounded-sm ">
      <h4 className="text-lg text-center font-semibold">
        Crear una nueva oferta
      </h4>
      <p className="text-sm">
        Aqui podra agragar ofertas a los productos existentes,
        <strong> (Marca - producto - cantidad).</strong>
      </p>
      <Form className="mt-2" onSubmit={handleNuevaOferta}>
        <Form.Label className="mb-1">Nombre de la oferta</Form.Label>
        <Form.Control
          type="text"
          placeholder="Black Friday"
          className="border-gray-300 rounded-md focus:outline-none shadow-none focus:border-slate-300"
          value={oferta.nombre}
          onChange={handleInputChange}
          name="nombre"
        />
        <Form.Label className="my-1">Porcentaje de descuento</Form.Label>
        <Form.Control
          type="number"
          min={1}
          max={100}
          placeholder="5"
          className="border-gray-300 rounded-md focus:outline-none shadow-none focus:border-slate-300"
          value={oferta.descuento}
          onChange={(e) => setOferta({ ...oferta, descuento: e.target.value })}
        />
        <Row className="mt-2">
          <Col>
            <Form.Label className="my-1">Fecha inicial de la oferta</Form.Label>
            <Form.Control
              type="date"
              value={oferta.fechaIni}
              className="border-gray-300 rounded-md focus:outline-none shadow-none focus:border-slate-300"
              name="fechaIni"
              onChange={handleInputChange}
            />
          </Col>
          <Form.Label className="label-date my-1">
            Fecha final de la oferta
          </Form.Label>
          <Col>
            <Form.Control
              type="date"
              value={oferta.fechaFin}
              name="fechaFin"
              className="border-gray-300 rounded-md focus:outline-none shadow-none focus:border-slate-300"
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
          <Button className="mt-4 w-full" type="submit">
            Crear nueva oferta
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Crear;
