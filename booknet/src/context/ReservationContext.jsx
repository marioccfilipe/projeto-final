import { createContext, useEffect, useState } from "react";

export const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem("reservations");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  function addReservation(reservation) {
    setReservations((prev) => [...prev, reservation]);
  }

  function removeReservation(id) {
    setReservations((prev) =>
      prev.filter((reservation) => reservation.id !== id)
    );
  }

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        addReservation,
        removeReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}