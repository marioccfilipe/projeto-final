import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Livros from "./pages/Livros";
import Clientes from "./pages/Clientes";
import Alugueis from "./pages/Alugueis";
import Reservas from "./pages/Reservas";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/livros" element={<Livros />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/alugueis" element={<Alugueis />} />
          <Route path="/reservas" element={<Reservas />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;