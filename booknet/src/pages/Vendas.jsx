import { useContext, useState } from "react";

import { BookContext } from "../context/BookContext";
import { ClientContext } from "../context/ClientContext";
import { SaleContext } from "../context/SaleContext";

export default function Vendas() {
  const { books, updateBook } = useContext(BookContext);
  const { clients } = useContext(ClientContext);
  const { sales, addSale } = useContext(SaleContext);

  const [clienteId, setClienteId] = useState("");
  const [livroId, setLivroId] = useState("");

  function realizarVenda() {
    const cliente = clients.find((c) => c.id === clienteId);
    const livro = books.find((b) => b.id === livroId);

    if (!cliente || !livro) {
      alert("Selecione cliente e livro.");
      return;
    }

    if (Number(livro.quantidade) <= 0) {
      alert("Livro sem estoque.");
      return;
    }

    addSale({
      id: crypto.randomUUID(),
      clienteId: cliente.id,
      clienteNome: cliente.nome,
      livroId: livro.id,
      livroNome: livro.nome,
      valor: livro.precoVenda || 0,
      dataVenda: new Date().toLocaleDateString(),
    });

    updateBook({
      ...livro,
      quantidade: Number(livro.quantidade) - 1,
      totalVendas: Number(livro.totalVendas) + 1,
    });

    alert("Venda realizada.");
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Vendas
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
          onClick={realizarVenda}
          className="bg-zinc-900 text-white px-4 py-2 rounded mt-4"
        >
          Vender Livro
        </button>
      </div>

      <div className="grid gap-4">
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="bg-white shadow rounded-xl p-4"
          >
            <h2 className="font-bold">
              {sale.livroNome}
            </h2>

            <p>Cliente: {sale.clienteNome}</p>
            <p>Data da venda: {sale.dataVenda}</p>
            <p>Valor: R$ {sale.valor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}