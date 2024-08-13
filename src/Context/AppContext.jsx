import { createContext, useContext, useState } from "react";
const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const AppContextProvider = ({ children }) => {
  // estados de notificaion provider
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [bgToast, setBgToast] = useState("");

  // retorno de contexto para el inicio y las notificaciones
  return (
    <NotificationContext.Provider
      value={{
        showToast,
        setShowToast,
        toastMessage,
        setToastMessage,
        bgToast,
        setBgToast,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
