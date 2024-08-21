export const checkSession = () => {
  const token = localStorage.getItem("userOnValidateScesOnline");
  return !!token;
};
