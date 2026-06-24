export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Sistema Book.Net
      </h1>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold">Livros</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold">Clientes</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold">Aluguéis</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold">Reservas</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

      </div>
    </div>
  );
}