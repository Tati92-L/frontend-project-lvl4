import React, { createContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Toast from 'react-bootstrap/Toast';
import 'react-toastify/scss/main.scss';

export const ToastifyContext = createContext({});

// eslint-disable-next-line react/prop-types
export default function ToastifyProvider({ children }) {
  const successMessage = (message) => toast.success(message);
  const errorMessage = (message) => toast.error(message);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ToastifyContext.Provider value={{ successMessage, errorMessage }}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {children}
    </ToastifyContext.Provider>
  );
}
