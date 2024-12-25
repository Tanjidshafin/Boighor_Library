import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/books");
      const data = await response.json();
      setBooks(data.map((book) => ({ ...book, category: book.category || "Uncategorized" })));
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/borrowedbooks");
      const result = await response.json();
      if (result.success) {
        setBorrowedBooks(result.data);
      } else {
        console.error("Failed to fetch borrowed books:", result.message);
      }
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
    }
  };
  const borrowBook = async (bookId) => {
    if (!bookId) {
      toast.error("Invalid book ID.");
      return;
    }
    const alreadyBorrowed = borrowedBooks.some((borrowedBook) => borrowedBook.bookId === bookId);
    if (alreadyBorrowed) {
      toast.warn("You have already borrowed this book.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/borrowbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });
      const result = await response.json();
      console.log("Borrow book response:", result);
      if (result.success) {
        await fetchBooks();
        await fetchBorrowedBooks();
        toast.success("Book borrowed successfully!");
      } else {
        toast.error(result.message || "Failed to borrow book.");
      }
    } catch (error) {
      console.error("Error sending borrow book request:", error);
      toast.error("An error occurred while borrowing the book.");
    }
  };
  const addBook = async (newBook) => {
    if (!newBook.name || !newBook.author_name) {
      toast.error("Book name and author name are required.");
      return;
    } newBook.quantity = newBook.quantity || 1;
    try {
      const response = await fetch("http://localhost:5000/addbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      const result = await response.json();
      if (result.success) {
        const addedBook = result.data;
        setBooks((prevBooks) => [...prevBooks, addedBook]);
        toast.success("Book added successfully!");
      } else {
        toast.error(result.message || "Failed to add book.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("An error occurred while adding the book.");
    }
  };


  const categories = [...new Set(books.map((book) => book.category || "Uncategorized"))];
  const value = {
    categories,
    books,
    addBook,
    borrowedBooks,
    borrowBook,
    fetchBorrowedBooks,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;