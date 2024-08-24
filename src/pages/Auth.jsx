import { useState, useEffect } from "react";
import API_HOST from "@/config/config";
import axios from "axios";
import { checkSession } from "@/utils/checkSession";

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(checkSession());
  }, []);

  if (isAuthenticated) {
    window.location.href = "/Dashboard";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_HOST}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        window.location.href = "/Dashboard";
      }
      localStorage.setItem(
        "userOnValidateScesOnline",
        JSON.stringify(response.data.user)
      );

      // if (response && response.status === 404) {
      //   localStorage.setItem("access_token", response.data.access_token);
      //   window.location.href = "/";
      // }
    } catch (error) {
      // if (error && error.response.status === 404) {
      //   setMessage("¡No se encontro usuario con estos datos!");
      //   setTimeout(() => {
      //     setMessage("");
      //   }, 3000);
      // }

      console.log("error en la solicutd", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="text-white min-h-screen bg-gradient-to-r from-[rgba(191,190,167,1)] via-[rgba(200,200,200,1)] to-[rgba(195,195,195,1)] bg-[112deg] flex justify-center flex-col items-center gap-3 auth">
      <div className="w-80 md:w-96 p-4 h-auto md:min-h-96 flex flex-col items-center rounded-lg shadow-xl bg-white">
        <div className="my-2">
          <h1 className="font-semibold text-lg md:text-2xl drop-shadow text-black text-center">
            Bienvenido
          </h1>
          <p className="text-slate-700 text-xs md:text-sm">
            Por favor ingrese sus credenciales
          </p>
        </div>
        <span className="text-center block mt-2 text-xs font-semibold text-red-600">
          <p className="text-base">{message}</p>
        </span>
        <form className="max-w-sm m-auto w-full" onSubmit={handleSubmit}>
          <label
            htmlFor="email-address-icon"
            className="block my-1 mx-1 text-sm font-medium text-gray-900 dark:text-white">
            Correo electronico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16">
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"></path>
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"></path>
              </svg>
            </div>
            <input
              type="email"
              name="email"
              required
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@example.com"
            />
          </div>
          <label
            htmlFor="email-address-icon"
            className="block my-1 mx-1 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 -start-1 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  fill="evenodd"
                  d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                  clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              type="password"
              name="password"
              id="email-address-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 w-full text-white mt-3 rounded-md py-[10px] text-xs md:text-sm uppercase hover:bg-blue-500 duration-150">
            Iniciar sesion
          </button>
        </form>
      </div>
    </section>
  );
};
