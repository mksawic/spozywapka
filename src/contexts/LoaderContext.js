import React, { useState, createContext, useContext } from "react";
import AppLoader from "../components/AppLoader";

export const LoaderContext = createContext();
export const useLoaderContext = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {loading && <AppLoader />}
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
