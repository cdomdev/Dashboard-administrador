import { ProIcons } from "./icons/ProIcon.jsx";
import { InvIcon } from "./icons/InvIcon.jsx";
import { VenIcons } from "./icons/VenIcons.jsx";
import { OferIcon } from "./icons/OferIcon.jsx";
import { CatIcon } from "./icons/CatIcon.jsx";
import { SubIcon } from "./icons/SubIcon.jsx";
import { Profile } from "./Profile.jsx";
import { useState } from "react";
import { Notificaciones } from "./Notificaciones.jsx";
import { UserIcon } from "./icons/UserIcon.jsx";

export const Sidebar = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 font-text-cust-2">
        <div className="px-4 md:px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <svg
                className="w-9 h-9 text-gray-800 dark:text-white relative cursor-pointer block md:hidden -mb-2"
                aria-hidden="true"
                onClick={toggleMenu}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>

              <div
                className={`${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                } fixed z-50 top-0 left-0 min-h-screen bg-white w-8/12 transform transition-transform duration-300`}>
                <div className="p-4">
                  <div className="flex justify-end">
                    <svg
                      className="w-8 h-8 text-gray-800 dark:text-white cursor-pointer"
                      onClick={toggleMenu}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <ul className="space-y-2 font-medium">
                      <li>
                        <a
                          href="/"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <svg
                            className="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"></path>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"></path>
                          </svg>
                          <span className="ms-2">Dashboard</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Productos"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <ProIcons />
                          <span className="flex-1 ms-2 whitespace-nowrap">
                            Productos
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Inventario"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <InvIcon />
                          <span className="flex-1 ms-2 whitespace-nowrap">
                            Inventario
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Ventas"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <VenIcons />
                          <span className="flex-1 ms-2 whitespace-nowrap">
                            Ventas
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Ofertas"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <OferIcon />
                          <span className="flex-1 ms-2 whitespace-nowrap">
                            Ofertas
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Categorias"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <CatIcon />
                          <span className="flex-1 ms-2 whitespace-nowrap">
                            Categorias
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Subcategorias"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <SubIcon />
                          <span className="flex-1 ms-2 whitespace-nowrap">
                            Subcategorias
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/gestion-usuarios/usuarios"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <UserIcon />
                          <span className="flex-1 ms-2 whitespace-nowrap">
                            Usuarios
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <a href="/" className="flex justify-center items-center">
                <span className="text-2xl -mb-2 pl-2 md:mb-0 md:text-3xl font-extrabold text-[#22365c]">
                  Suministros
                </span>
              </a>
            </div>
            <div className="flex gap-2 md:gap-3 justify-center items-center">
              <Notificaciones />
              <Profile />
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed lg:block font-text-cust-2 top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200   sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg
                  className="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"></path>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"></path>
                </svg>
                <span className="ms-2">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/Productos"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <ProIcons />
                <span className="flex-1 ms-2 whitespace-nowrap">Productos</span>
              </a>
            </li>
            <li>
              <a
                href="/Inventario"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <InvIcon />
                <span className="flex-1 ms-2 whitespace-nowrap">
                  Inventario
                </span>
              </a>
            </li>
            <li>
              <a
                href="/pedidos"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <VenIcons />
                <span className="flex-1 ms-2 whitespace-nowrap">Ventas</span>
              </a>
            </li>
            <li>
              <a
                href="/Ofertas"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <OferIcon />
                <span className="flex-1 ms-2 whitespace-nowrap">Ofertas</span>
              </a>
            </li>
            <li>
              <a
                href="/Categorias"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <CatIcon />
                <span className="flex-1 ms-2 whitespace-nowrap">
                  Categorias
                </span>
              </a>
            </li>
            <li>
              <a
                href="/Subcategorias"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <SubIcon />
                <span className="flex-1 ms-2 whitespace-nowrap">
                  Subcategorias
                </span>
              </a>
            </li>
            <li>
              <a
                href="/gestion-usuarios/usuarios"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <UserIcon />
                <span className="flex-1 ms-2 whitespace-nowrap">Usuarios</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
