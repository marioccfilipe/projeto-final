import { useContext, useState } from "react";
import { BookContext } from "../context/BookContext";

export default function Livros() {
  const { books, addBook, removeBook } =
    useContext(BookContext);

  const [formData, setFormData] = useState({
    isbn: "",
    nome: "",
    autor: "",
    editora: "",
    ano: "",
    assunto: "",
    tipo: "Venda",
    origem: "Nacional",
    quantidade: 1,
    precoVenda: "",
    precoAluguel: "",
    precoRenovacao: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    addBook({
      id: crypto.randomUUID(),
      ...formData,
      totalVendas: 0,
      totalAlugueis: 0,
    });

    setFormData({
      isbn: "",
      nome: "",
      autor: "",
      editora: "",
      ano: "",
      assunto: "",
      tipo: "Venda",
      origem: "Nacional",
      quantidade: 1,
      precoVenda: "",
      precoAluguel: "",
      precoRenovacao: "",
    });
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Cadastro de Livros
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="nome"
            placeholder="Nome do Livro"
            value={formData.nome}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="autor"
            placeholder="Autor"
            value={formData.autor}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="editora"
            placeholder="Editora"
            value={formData.editora}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="ano"
            placeholder="Ano"
            value={formData.ano}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="assunto"
            placeholder="Assunto"
            value={formData.assunto}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

        </div>

        <button
          className="bg-zinc-900 text-white px-4 py-2 rounded mt-4"
        >
          Salvar Livro
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow p-4"
          >
            <h2 className="font-bold text-xl">
              {book.nome}
            </h2>

            <p>Autor: {book.autor}</p>
            <p>ISBN: {book.isbn}</p>

            <button
              onClick={() => removeBook(book.id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-3"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}