import { useState, useEffect } from "react";
import { getDataStorage } from "@/utils/getDataStorage";
import axios from "axios";
import API_HOST from "@/config/config";

export const Profile = () => {
  const [data, setData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const dataLocal = getDataStorage("userOnValidateScesOnline");
    if (dataLocal) {
      setData(dataLocal);
    } else {
      return null;
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const clearStorege = () => {
    localStorage.clear();
    sessionStorage.clear();
  };
  const logOut = async () => {
    clearStorege();
    const response = await axios.post(`${API_HOST}/api/logout`);
    if (response.status === 200) {
      window.location.href = "/";
    }
  };

  return (
    <>
      {data && data.picture ? (
        <img
          id="avatarButton"
          type="button"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className="w-10 h-10 rounded-full cursor-pointer relative"
          src={data?.picture}
          alt="profile user"
          onClick={toggleDropdown}
          loading="lazy"
        />
      ) : (
        <div
          className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
          onClick={toggleDropdown}>
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"></path>
          </svg>
        </div>
      )}

      <div
        id="userDropdown"
        className={`z-10 absolute right-3 -bottom-[170px] ${
          dropdownOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div className="font-semibold text-base uppercase">
            {data ? data.name || data.nombre : " "}
          </div>
          <div className="font-medium truncate">{data?.email || ""}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton">
          <li>
            <a
              href="/Dashboard"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Dashboard
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a
            href="#"
            type="button"
            onClick={() => logOut()}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Cerrar sesion
          </a>
        </div>
      </div>
    </>
  );
};
