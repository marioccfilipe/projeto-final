import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { BookProvider } from "./context/BookContext";
import { ClientProvider } from "./context/ClientContext";
import { RentalProvider } from "./context/RentalContext";
import { ReservationProvider } from "./context/ReservationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookProvider>
      <ClientProvider>
        <RentalProvider>
          <ReservationProvider>
            <App />
          </ReservationProvider>
        </RentalProvider>
      </ClientProvider>
    </BookProvider>
  </React.StrictMode>
);