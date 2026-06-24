import { useContext, useState } from "react";
import { ClientContext } from "../context/ClientContext";

export default function Clientes() {
  const { clients, addClient, removeClient } =
    useContext(ClientContext);

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    nascimento: "",
    endereco: "",
    telefone: "",
    email: "",
    homepage: "",
    outrosTelefones: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    addClient({
      id: crypto.randomUUID(),
      ...formData,
      alugueisAtivos: 0,
      totalCompras: 0,
      totalAlugueis: 0,
    });

    setFormData({
      nome: "",
      cpf: "",
      nascimento: "",
      endereco: "",
      telefone: "",
      email: "",
      homepage: "",
      outrosTelefones: "",
    });
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Cadastro de Clientes
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="nome"
            placeholder="Nome Completo"
            value={formData.nome}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="cpf"
            placeholder="CPF ou RG"
            value={formData.cpf}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="date"
            name="nascimento"
            value={formData.nascimento}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="endereco"
            placeholder="Endereço Completo"
            value={formData.endereco}
            onChange={handleChange}
            className="border p-2 rounded md:col-span-2"
            required
          />

          <input
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="homepage"
            placeholder="Homepage"
            value={formData.homepage}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="outrosTelefones"
            placeholder="Outros Telefones"
            value={formData.outrosTelefones}
            onChange={handleChange}
            className="border p-2 rounded md:col-span-2"
          />

        </div>

        <button
          className="bg-zinc-900 text-white px-4 py-2 rounded mt-4"
        >
          Salvar Cliente
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-xl shadow p-4"
          >
            <h2 className="font-bold text-xl">
              {client.nome}
            </h2>

            <p>CPF: {client.cpf}</p>
            <p>Telefone: {client.telefone}</p>

            <button
              onClick={() => removeClient(client.id)}
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