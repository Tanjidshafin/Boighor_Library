import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/books");
      const data = await response.json();
      const updatedBooks = data.map((book) => ({
        ...book,
        category: book.category || "Uncategorized",
      }));
      setBooks(updatedBooks);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };
  const addBook = async (newBook) => {
    try {
      const response = await fetch("http://localhost:5000/addbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) {
        throw new Error("Failed to add book");
      }
      const result = await response.json();
      if (result.success) {
        const addedBook = result.data;
        setBooks((prevBooks) => [
          ...prevBooks,
          { ...addedBook, category: addedBook.category || "Uncategorized" },
        ]);
      } else {
        throw new Error(result.message || "Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  const categories = [...new Set(books.map((book) => book.category || "Uncategorized"))];
  const value = {
    categories,
    books,
    addBook,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
