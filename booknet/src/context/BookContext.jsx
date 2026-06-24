import { createContext, useEffect, useState } from "react";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  function addBook(book) {
    setBooks((prev) => [...prev, book]);
  }

  function removeBook(id) {
    setBooks((prev) =>
      prev.filter((book) => book.id !== id)
    );
  }

  function updateBook(updatedBook) {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );
  }

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        removeBook,
        updateBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}