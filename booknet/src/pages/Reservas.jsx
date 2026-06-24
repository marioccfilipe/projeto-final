import { useContext, useState } from "react";

import { BookContext } from "../context/BookContext";
import { ClientContext } from "../context/ClientContext";
import { ReservationContext } from "../context/ReservationContext";

export default function Reservas() {
  const { books } = useContext(BookContext);
  const { clients } = useContext(ClientContext);

  const {
    reservations,
    addReservation,
    removeReservation,
  } = useContext(ReservationContext);

  const [clienteId, setClienteId] = useState("");
  const [livroId, setLivroId] = useState("");

  function fazerReserva() {
    const cliente = clients.find((c) => c.id === clienteId);
    const livro = books.find((b) => b.id === livroId);

    if (!cliente || !livro) {
      alert("Selecione cliente e livro.");
      return;
    }

    if (Number(livro.quantidade) > 0) {
      alert("Este livro ainda está disponível. Não precisa reservar.");
      return;
    }

    const reservaExistente = reservations.find(
      (r) =>
        r.clienteId === cliente.id &&
        r.livroId === livro.id &&
        r.status === "ATIVA"
    );

    if (reservaExistente) {
      alert("Este cliente já possui reserva para este livro.");
      return;
    }

    addReservation({
      id: crypto.randomUUID(),
      clienteId: cliente.id,
      clienteNome: cliente.nome,
      livroId: livro.id,
      livroNome: livro.nome,
      dataReserva: new Date().toLocaleDateString(),
      status: "ATIVA",
    });

    alert("Reserva realizada.");
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Reservas
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Selecione um cliente</option>

            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nome}
              </option>
            ))}
          </select>

          <select
            value={livroId}
            onChange={(e) => setLivroId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Selecione um livro</option>

            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.nome} — Estoque: {book.quantidade}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={fazerReserva}
          className="bg-zinc-900 text-white px-4 py-2 rounded mt-4"
        >
          Reservar Livro
        </button>
      </div>

      <div className="grid gap-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white shadow rounded-xl p-4"
          >
            <h2 className="font-bold">
              {reservation.livroNome}
            </h2>

            <p>Cliente: {reservation.clienteNome}</p>
            <p>Data da reserva: {reservation.dataReserva}</p>
            <p>Status: {reservation.status}</p>

            <button
              onClick={() => removeReservation(reservation.id)}
              className="bg-red-600 text-white px-3 py-1 rounded mt-3"
            >
              Cancelar Reserva
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}