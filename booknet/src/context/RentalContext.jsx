import { createContext, useEffect, useState } from "react";

export const RentalContext = createContext();

export function RentalProvider({ children }) {
  const [rentals, setRentals] = useState(() => {
    const saved = localStorage.getItem("rentals");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("rentals", JSON.stringify(rentals));
  }, [rentals]);

  function addRental(rental) {
    setRentals((prev) => [...prev, rental]);
  }

  function removeRental(id) {
    setRentals((prev) =>
      prev.filter((rental) => rental.id !== id)
    );
  }

  return (
    <RentalContext.Provider
      value={{
        rentals,
        addRental,
        removeRental,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
}