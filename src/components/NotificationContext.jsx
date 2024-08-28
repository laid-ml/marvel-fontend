import React, { createContext, useState, useContext } from "react";
import { Toaster, toast } from "sonner";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, options) => {
    setNotifications([...notifications, { message, options }]);
    toast(message, options);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <Toaster position="top-right" richColors />
    </NotificationContext.Provider>
  );
};
