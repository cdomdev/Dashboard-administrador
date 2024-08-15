const formateValue = (value) => {
  return parseFloat(Number(value))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default formateValue;
