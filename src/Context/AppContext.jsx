import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase.init";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  useEffect(() => {
    fetchBooks();
    monitorAuthState();
  }, []);

  const ScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return null;
  };
  ScrollToTop();
  const monitorAuthState = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }

    });

  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to log out. Please try again.");
    }

  };

  const fetchBooks = async () => {
    try {
      const response = await fetch("https://boighor-server-neon.vercel.app/books");
      const data = await response.json();
      setBooks(data.map((book) => ({ ...book, category: book.category || "Uncategorized" })));
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  const fetchBorrowedBooks = async () => {
    if (!user) return;
    try {
      const response = await fetch(`https://boighor-server-neon.vercel.app/borrowedbooks/${user.uid}`);
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
    if (!bookId || !user) {
      toast.error("Invalid book ID or user not logged in.");
      return;
    }
    const alreadyBorrowed = borrowedBooks.some((borrowedBook) => borrowedBook.bookId === bookId);
    if (alreadyBorrowed) {
      toast.warn("You have already borrowed this book.");
      return;
    }
    try {
      const response = await fetch("https://boighor-server-neon.vercel.app/borrowbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, userId: user.uid }),
      });
      const result = await response.json();
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
    }
    newBook.quantity = newBook.quantity || 1;
    try {
      const response = await fetch("https://boighor-server-neon.vercel.app/addbook", {
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

  const returnBook = async (borrowedBookId, bookId) => {
    try {
      const response = await fetch("https://boighor-server-neon.vercel.app/returnbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrowedBookId }),
      });

      const result = await response.json();

      if (result.success) {
        setBorrowedBooks((prev) => prev.filter((book) => book._id !== borrowedBookId));
        setBooks((prev) =>
          prev.map((book) =>
            book._id === bookId ? { ...book, quantity: book.quantity + 1 } : book
          )
        );
        toast.success("Book returned successfully!");
      } else {
        toast.error(result.message || "Failed to return book.");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      toast.error("An error occurred while returning the book.");
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
    returnBook,
    user,
    handleLogout,
    setUser,
    fetchBooks,
    setBooks,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
