import { createContext, useEffect, useState } from "react";

export const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem("clients");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  function addClient(client) {
    setClients((prev) => [...prev, client]);
  }

  function removeClient(id) {
    setClients((prev) =>
      prev.filter((client) => client.id !== id)
    );
  }

  function updateClient(updatedClient) {
    setClients((prev) =>
      prev.map((client) =>
        client.id === updatedClient.id
          ? updatedClient
          : client
      )
    );
  }

  return (
    <ClientContext.Provider
      value={{
        clients,
        addClient,
        removeClient,
        updateClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}