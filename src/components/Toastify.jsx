import React, { createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const ToastifyContext = createContext({});

// eslint-disable-next-line react/prop-types
export default function ToastifyProvider({ children }) {
  const successMessage = (message) => toast.success(message);
  const errorMessage = (message) => toast.error(message);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ToastifyContext.Provider value={{ successMessage, errorMessage }}>
      <ToastContainer />
      {children}
    </ToastifyContext.Provider>
  );
}
