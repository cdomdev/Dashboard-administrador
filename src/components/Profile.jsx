import { useState, useEffect } from "react";
import { getDataStorage } from "@/utils/getDataStorage";

export const Profile = () => {
  const [data, setData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = getDataStorage("userOnValidateScesOnline");
      setData(storedData);
      console.log(storedData);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
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
        <img
          src="../../defaul.png"
          alt=""
          className="rounded-full cursor-pointer relative w-10 h-10"
          id="avatarButton"
          type="button"
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          onClick={toggleDropdown}
          loading="lazy"
        />
      )}

      <div
        id="userDropdown"
        className={`z-10 absolute right-3 -bottom-56 ${
          dropdownOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{data?.name || "Bonnie Green"}</div>
          <div className="font-medium truncate">
            {data?.email || "name@flowbite.com"}
          </div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton">
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-1">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Sign out
          </a>
        </div>
      </div>
    </>
  );
};
