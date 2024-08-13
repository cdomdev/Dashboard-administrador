const formatedDate = (dateString) => {
  // Asegurarse de que el valor de fecha sea válido
  const date = new Date(dateString);
  if (isNaN(date)) {
    return "Fecha inválida";
  }

  const formatedDate = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);

  return formatedDate;
};

export default formatedDate;
