import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const HOST = import.meta.env.PUBLIC_HOST_API;
const socket = io(HOST, {});

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState([])
  const messageListRef = useRef(null);

  useEffect (() =>{
    const dataAmd = JSON.parse(localStorage.getItem('infoProfileUSer'))
    if(dataAmd){
      setData(dataAmd)
    }
  }, [])

  console.log(data)
  let hora = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });


  const handleMessage = async (event) => {
    event.preventDefault();

    const newMessage = {
      id: data.id,
      usuario: data.nombre,
      mensaje: message,
      estado: "enviado",
      hora: hora
    };

    setMessages([...messages, newMessage]);
    socket.emit("chat_message", newMessage);
    setMessage("");
  };

  useEffect(() => {
    socket.on("message_response", (messageResponse) => {
      setMessages((prevMessages) => [...prevMessages, messageResponse]);
    });

    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }

    // Escuchar actualizaciones de estado
    socket.on("message_status", ({ id, estado }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg.id === id ? { ...msg, estado } : msg))
      );
    });

    return () => {
      socket.off("message_response");
      socket.off("message_status");
    };
  }, [messages]);

  return (
    <div className="border border-slate-50 bg-white p-4 rounded-md h-[600px] flex flex-col justify-between overflow-hidden font-text-cust-2">
      <div
        ref={messageListRef}
        className="flex-1 flex flex-col-reverse overflow-y-auto gap-2 p-2 rounded-md border-transparent "
      >
        {messages.length === 0 ? (
          <span className="text-gray-500 text-xs text-center">
            El usuario no ah dejado mensajes, si quieres enviar algun dato sobre
            su pedido, escibe un mensaje...
          </span>
        ) : (
          <ul className="w-full flex flex-col gap-2 relative">
            <span
              className={`text-center  justify-center text-gray-500 text-[10px] mb-3  rounded-md py-1 items-center gap-1 ${messages.length > 0 ? "flex" : "hidden"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-lock size-3"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
              </svg>
              Los mensajes estan sifrados de extremo a extremo, nadie fuera de
              este chat puede leerlos
            </span>
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`py-1.5 px-3 text-sm  text-gray-700 flex items-center flex-col
        ${msg.usuario === data.nombre ? "bg-blue-100 self-start text-left rounded-r-2xl rounded-bl-3xl" : "bg-green-100 self-end text-right rounded-l-2xl rounded-br-3xl"}`}
                style={{ maxWidth: "70%" }}
              >
                <span>
                  <strong
                    className={`${
                      msg.usuario === data.nombre
                        ? "text-blue-400 text-xs "
                        : "text-green-700 text-xs opacity-30"
                    }`}
                  ></strong>
                  {msg.mensaje}
                </span>
                <span className="text-[8px] block self-end -py-2 font-medium -mt-1">
                  {hora}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full mt-4">
        <form
          className="flex w-full gap-1 items-center"
          onSubmit={handleMessage}
        >
          <input
            type="text"
            id="message"
            value={message}
            placeholder="Escribe tu mensaje..."
            onChange={(e) => setMessage(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="border px-3 py-2.5 bg-blue-600 text-white rounded-md text-sm flex items-center gap-1 font-medium"
          >
            Enviar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-send-2 size-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
              <path d="M6.5 12h14.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
