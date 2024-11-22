import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import formateValue from "./formateValue";

export const createDetallePDF = (usuario, pedido) => {
  const doc = new jsPDF();

  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const año = fecha.getFullYear();
  const horas = `${fecha.getHours()}`.padStart(2, "0");
  const minutes = `${fecha.getMinutes()}`.padStart(2, "0");
  const seconds = `${fecha.getSeconds()}`.padStart(2, "0");

  const total = pedido.costo_de_envio + pedido.pago_total;
  const timeFormatted = `${horas}:${minutes}:${seconds}`;

  // Título principal
  doc.setFont("Roboto", "bold");
  doc.setFontSize(17);
  doc.text(`DETALLE DE COMPRA # ${pedido.id.replaceAll("-", "")}`, 105, 25, {
    align: "center",
  });

  // Fecha
  const textoFecha = `${dia} / ${mes} / ${año}  -  ${timeFormatted}`;
  doc.setFontSize(8);
  doc.setTextColor(85, 85, 85);
  doc.text(textoFecha, 105, 30, { align: "center" });

  // linea con estilo dashed
  doc.setLineDashPattern([1, 1], 0);
  doc.line(12, 35, 198, 35);

  // Primer subtitulo
  doc.setFont("Roboto", "bold");
  doc.setFontSize(12);
  doc.text("DATOS DEL CLIENTE", 12, 45);

  console.log(pedido);
  //   datos del usuario
  doc.setFont("Roboto", "normal");
  doc.setFontSize(11);
  doc.text(`NOMBRE: ${usuario.nombre}`, 12, 55);
  doc.text(`EMAIL: ${usuario.email}`, 12, 62);
  doc.text(`TELEFONO: ${usuario.telefono}`, 12, 69);
  doc.text(`DIRECCION: ${usuario.direccion}`, 12, 76);
  doc.text(`CIDUDAD: ${usuario.ciudad}`, 12, 83);
  doc.text(`DEPARTAMENTO: ${usuario.departamento}`, 12, 90);
  doc.text(
    `ESTADO DEL PEDIDO: ${pedido.estado_pedido || "Pedido sin estado"}`,
    12,
    97
  );

  doc.setFont("Roboto", "bold");
  doc.setFontSize(12);
  doc.text("DETALLES DE LA COMPRA", 12, 110);

  const tableBody = pedido.detalles_pedido.map((detalle) => [
    detalle.Producto.nombre,
    detalle.cantidad,
    `${detalle.descuento || 0} %`,
    formateValue(detalle.Producto.valor),
  ]);

  autoTable(doc, {
    startY: 115,
    head: [["Nombre", "Cantidad", "Descuento", "Precio"]],
    body: tableBody,
    foot: [
      ["Método de Pago:", pedido.metodo_de_pago.replaceAll("-", "")],
      ["Costo de Envío:", formateValue(pedido.costo_de_envio)],
      ["Pago Total:", formateValue(pedido.pago_total)],
    ],
    margin: { top: 10, left: 12, right: 12 },
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    headStyles: {
      fillColor: [200, 200, 200],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
    footStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontStyle: "bold",
    },
  });

  // Guardar PDF
  // doc.autoPrint({ variant: "non-conform" });
  doc.save(`Ticket-${usuario?.nombre?.toLowerCase()}.pdf`);
};
