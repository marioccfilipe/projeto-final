import { BookProvider } from "./context/BookContext";
import { ClientProvider } from "./context/ClientContext";
import { RentalProvider } from "./context/RentalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookProvider>
      <ClientProvider>
        <RentalProvider>
          <App />
        </RentalProvider>
      </ClientProvider>
    </BookProvider>
  </React.StrictMode>
);