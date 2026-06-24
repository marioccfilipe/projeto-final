import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex gap-6">
        <Link to="/">Dashboard</Link>
        <Link to="/livros">Livros</Link>
         <Link to="/clientes">Clientes</Link>
        <Link to="/alugueis">Aluguéis</Link>
        <Link to="/reservas">Reservas</Link>
        <Link to="/vendas">Vendas</Link>
        
      </div>
    </nav>
  );
}