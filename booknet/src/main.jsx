import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { BookProvider } from "./context/BookContext";
import { ClientProvider } from "./context/ClientContext";
import { RentalProvider } from "./context/RentalContext";
import { ReservationProvider } from "./context/ReservationContext";
import { SaleProvider } from "./context/SaleContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BookProvider>
  <ClientProvider>
    <RentalProvider>
      <ReservationProvider>
        <SaleProvider>
          <App />
        </SaleProvider>
      </ReservationProvider>
    </RentalProvider>
  </ClientProvider>
</BookProvider>
);