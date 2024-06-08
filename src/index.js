import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";
import { store } from "./context/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { Loading } from "./components/loading/loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnackbarProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
        <Loading />
      </BrowserRouter>
    </Provider>
  </SnackbarProvider>
);
