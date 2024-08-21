import { ProIcons } from "./icons/ProIcon.jsx";
import { InvIcon } from "./icons/InvIcon.jsx";
import { VenIcons } from "./icons/VenIcons.jsx";
import { OferIcon } from "./icons/OferIcon.jsx";
import { CatIcon } from "./icons/CatIcon.jsx";
import { SubIcon } from "./icons/SubIcon.jsx";
import { Logo } from "./icons/Logo.jsx";
import { Profile } from "./Profile.jsx";
import { SingIn } from "./icons/SingIn.jsx";
import { useEffect } from "react";
import { checkSession } from "@/utils/checkSession.jsx";
import { Notificaciones } from "./Notificaciones.jsx";

export const Sidebar = () => {
  useEffect(() => {
    const sesion = checkSession();
    if (!sesion) {
      return null;
    }
  }, []);

  return (
    <header>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <a href="/Dashboard" className="flex justify-center items-center">
                <Logo />
              </a>
            </div>
            <div className="flex gap-3 justify-center items-center">
              <Notificaciones />
              <Profile />
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/Dashboard"
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
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/Productos"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <ProIcons />
                <span className="flex-1 ms-3 whitespace-nowrap">Productos</span>
              </a>
            </li>
            <li>
              <a
                href="/Inventario"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <InvIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Inventario
                </span>
              </a>
            </li>
            <li>
              <a
                href="/Ventas"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <VenIcons />
                <span className="flex-1 ms-3 whitespace-nowrap">Ventas</span>
              </a>
            </li>
            <li>
              <a
                href="/Ofertas"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <OferIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Ofertas</span>
              </a>
            </li>
            <li>
              <a
                href="/Categorias"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <CatIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Categorias
                </span>
              </a>
            </li>
            <li>
              <a
                href="/Subcategorias"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <SubIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Subcategorias
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <SingIn />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </header>
  );
};
