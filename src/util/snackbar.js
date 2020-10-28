import React, { useState, useEffect, useContext, createContext } from "react";
import Snackbar from "../components/Snackbar";

const snackbarContext = createContext();

export function ProvideSnackbar({ children }) {
  const snackbar = useProvideSnackbar();
  return <snackbarContext.Provider value={snackbar}><Snackbar data={snackbar} success={snackbar}/>{children}</snackbarContext.Provider>;
}

export const useSnackbar = () => {
  return useContext(snackbarContext);
};

function useProvideSnackbar() {
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const changeMessage = (success, message) => {
    setSuccess(success);
    setMessage(message);
  };

  useEffect(() => {
  }, []);

  return {
    success,
    message,
    changeMessage
  };
}
