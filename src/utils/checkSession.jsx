export const checkSession = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};
