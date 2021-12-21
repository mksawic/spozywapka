import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import { Provider } from "react-redux";
import ThemeProvider from "./themes";
import store from "./store";
import AppNavigator from "./navigation/AppNavigator";
import LoaderProvider from "./contexts/LoaderContext";
import { StatusBar } from "expo-status-bar";

const Root = () => {
  const isLoadingComplete = useCachedResources();
  return isLoadingComplete ? (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <LoaderProvider>
            <AppNavigator />
          </LoaderProvider>
        </Provider>
      </ThemeProvider>
      <StatusBar backgroundColor="black" style="light" />
    </>
  ) : null;
};

export default Root;
