import { createContext, useEffect, useState } from "react";

export const SaleContext = createContext();

export function SaleProvider({ children }) {
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem("sales");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  function addSale(sale) {
    setSales((prev) => [...prev, sale]);
  }

  return (
    <SaleContext.Provider value={{ sales, addSale }}>
      {children}
    </SaleContext.Provider>
  );
}