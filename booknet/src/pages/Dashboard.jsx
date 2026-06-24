import { useContext } from "react";

import { BookContext } from "../context/BookContext";
import { ClientContext } from "../context/ClientContext";
import { RentalContext } from "../context/RentalContext";
import { ReservationContext } from "../context/ReservationContext";
import { SaleContext } from "../context/SaleContext";

export default function Dashboard() {
  const { books } = useContext(BookContext);
  const { clients } = useContext(ClientContext);
  const { rentals } = useContext(RentalContext);
  const { reservations } = useContext(ReservationContext);
  const { sales } = useContext(SaleContext);

  const alugueisAtivos = rentals.filter(
    (rental) => rental.status === "ATIVO"
  );

  const reservasAtivas = reservations.filter(
    (reservation) => reservation.status === "ATIVA"
  );

  const livrosMaisAlugados = [...books]
    .sort((a, b) => Number(b.totalAlugueis) - Number(a.totalAlugueis))
    .slice(0, 3);

  const livrosMenosAlugados = [...books]
    .sort((a, b) => Number(a.totalAlugueis) - Number(b.totalAlugueis))
    .slice(0, 3);

  const livrosMaisVendidos = [...books]
    .sort((a, b) => Number(b.totalVendas) - Number(a.totalVendas))
    .slice(0, 3);

  const livrosMenosVendidos = [...books]
    .sort((a, b) => Number(a.totalVendas) - Number(b.totalVendas))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Book.Net
      </h1>

      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold">Livros</h2>
          <p className="text-3xl font-bold">{books.length}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold">Clientes</h2>
          <p className="text-3xl font-bold">{clients.length}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold">Aluguéis Ativos</h2>
          <p className="text-3xl font-bold">{alugueisAtivos.length}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold">Reservas Ativas</h2>
          <p className="text-3xl font-bold">{reservasAtivas.length}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold">Vendas</h2>
          <p className="text-3xl font-bold">{sales.length}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Livros mais alugados
          </h2>

          {livrosMaisAlugados.length === 0 ? (
            <p>Nenhum livro cadastrado.</p>
          ) : (
            livrosMaisAlugados.map((book) => (
              <p key={book.id}>
                {book.nome} — {book.totalAlugueis} aluguéis
              </p>
            ))
          )}
        </section>

        <section className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Livros menos alugados
          </h2>

          {livrosMenosAlugados.length === 0 ? (
            <p>Nenhum livro cadastrado.</p>
          ) : (
            livrosMenosAlugados.map((book) => (
              <p key={book.id}>
                {book.nome} — {book.totalAlugueis} aluguéis
              </p>
            ))
          )}
        </section>

        <section className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Livros mais vendidos
          </h2>

          {livrosMaisVendidos.length === 0 ? (
            <p>Nenhum livro cadastrado.</p>
          ) : (
            livrosMaisVendidos.map((book) => (
              <p key={book.id}>
                {book.nome} — {book.totalVendas} vendas
              </p>
            ))
          )}
        </section>

        <section className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Livros menos vendidos
          </h2>

          {livrosMenosVendidos.length === 0 ? (
            <p>Nenhum livro cadastrado.</p>
          ) : (
            livrosMenosVendidos.map((book) => (
              <p key={book.id}>
                {book.nome} — {book.totalVendas} vendas
              </p>
            ))
          )}
        </section>
      </div>
    </div>
  );
}