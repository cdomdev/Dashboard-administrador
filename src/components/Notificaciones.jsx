import { notificaciones } from "@/services/notificaciones";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { useEffect, useState } from "react";
import { Read } from "./Read";
import { Close } from "./icons/Close";

export const Notificaciones = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await notificaciones();
      if (data) {
        setMessages(data);
      } else {
        setMessages([])
      }
    };
    fetchData();
  }, []);


  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <span className="rounded-full p-2 flex absolute right-[70px] bottom-9 bg-red-700 text-white w-5 h-5 text-xs font-semibold justify-center items-center">
        {messages.notifications?.length || 0}
      </span>
      <button onClick={toggleDropdown} type="button">
        <svg
          className="w-8 h-8 text-gray-800 dark:text-white -mb-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
        </svg>
      </button>

      <div
        className={`z-10 right-10 -bottom-96 min-h-96 max-h-1 overflow-y-auto  absolute ${dropdownOpen ? "block" : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-gray-700 dark:divide-gray-600 `}>
        <div className="flex items-center justify-end mr-3 gap-1">
          <Read toggleDropdown={toggleDropdown} />
          <Close toggleDropdown={toggleDropdown} />
        </div>
        {messages.notifications && messages.notifications.length > 0 ? (
          <ul className="flex flex-col">
            {messages.notifications.map((noti) => (
              <li
                key={noti.id}
                onClick={() => window.location.href = '/pedidos'}
                className="text-[10px] md:text-[11px] flex gap-1 cursor-pointer hover:bg-gray-300 p-2 rounded-sm items-center justify-between">
                <div className="w-full">
                  <p className="text-wrap leading-3">{noti.mensaje}</p>
                  <span className="text-gray-600 text-right">
                    {formatTimestamp(noti.createdAt)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-2 text-center">No hay notificaciones</div>
        )}
      </div>
    </>
  );
};
