// obetener datos del localStorage
const getDataStorage = (key) => {
  const dataLocal = localStorage.getItem(key);
  if (dataLocal) {
    return JSON.parse(dataLocal);
  }
  return null;
};

// obetener datos del sessionStorage
const getDataSesionStorega = (key) => {
  const dataLocal = sessionStorage.getItem(key);
  if (dataLocal) {
    return JSON.parse(dataLocal);
  }
  return null;
};

export default { getDataSesionStorega, getDataStorage };
