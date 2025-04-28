import React  from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux-store/store";
import SnackBarUi from "./components/ui/snackbarUi";
import { InvoiceContextProvider } from "./invoiceContext/invoiceContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <InvoiceContextProvider>
      <App />
      <SnackBarUi />
    </InvoiceContextProvider>
  </Provider>
);
