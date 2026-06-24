import { useContext, useState } from "react";

import { BookContext } from "../context/BookContext";
import { ClientContext } from "../context/ClientContext";
import { RentalContext } from "../context/RentalContext";

export default function Alugueis() {
  const { books, updateBook } = useContext(BookContext);
  const { clients } = useContext(ClientContext);

  const {
    rentals,
    addRental,
    updateRental,
  } = useContext(RentalContext);

  const [clienteId, setClienteId] = useState("");
  const [livroId, setLivroId] = useState("");

  function devolverLivro(rental) {
    const livro = books.find(
      (book) => book.id === rental.livroId
    );

    if (!livro) return;

    updateRental({
      ...rental,
      status: "DEVOLVIDO",
    });

    updateBook({
      ...livro,
      quantidade: Number(livro.quantidade) + 1,
    });

    alert("Livro devolvido.");
  }

  function renovarLivro(rental) {
    const partes = rental.dataDevolucao.split("/");

    const novaData = new Date(
      Number(partes[2]),
      Number(partes[1]) - 1,
      Number(partes[0])
    );

    novaData.setDate(novaData.getDate() + 14);

    updateRental({
      ...rental,
      renovacoes: Number(rental.renovacoes) + 1,
      dataDevolucao: novaData.toLocaleDateString(),
    });

    alert("Aluguel renovado.");
  }

  function realizarAluguel() {
    const cliente = clients.find((c) => c.id === clienteId);
    const livro = books.find((b) => b.id === livroId);

    if (!cliente || !livro) {
      alert("Selecione cliente e livro.");
      return;
    }

    const alugueisCliente = rentals.filter(
      (r) =>
        r.clienteId === cliente.id &&
        r.status === "ATIVO"
    );

    if (alugueisCliente.length >= 3) {
      alert("Cliente já possui 3 livros alugados.");
      return;
    }

    if (Number(livro.quantidade) <= 0) {
      alert("Livro sem estoque.");
      return;
    }

    const hoje = new Date();
    const devolucao = new Date();

    devolucao.setDate(devolucao.getDate() + 14);

    addRental({
      id: crypto.randomUUID(),

      clienteId: cliente.id,
      clienteNome: cliente.nome,

      livroId: livro.id,
      livroNome: livro.nome,

      dataAluguel: hoje.toLocaleDateString(),
      dataDevolucao: devolucao.toLocaleDateString(),

      renovacoes: 0,
      status: "ATIVO",
    });

    updateBook({
      ...livro,
      quantidade: Number(livro.quantidade) - 1,
      totalAlugueis: Number(livro.totalAlugueis) + 1,
    });

    alert("Aluguel realizado.");
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Aluguéis
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
                {book.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={realizarAluguel}
          className="bg-zinc-900 text-white px-4 py-2 rounded mt-4"
        >
          Alugar Livro
        </button>
      </div>

      <div className="grid gap-4">
        {rentals.map((rental) => (
          <div
            key={rental.id}
            className="bg-white shadow rounded-xl p-4"
          >
            <h2 className="font-bold">
              {rental.livroNome}
            </h2>

            <p>Cliente: {rental.clienteNome}</p>
            <p>Devolução: {rental.dataDevolucao}</p>
            <p>Status: {rental.status}</p>
            <p>Renovações: {rental.renovacoes}</p>

            {rental.status === "ATIVO" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => devolverLivro(rental)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Devolver
                </button>

                <button
                  onClick={() => renovarLivro(rental)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Renovar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}