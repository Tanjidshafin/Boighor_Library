import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then(res => res.json())
      .then(data => setBooks(data))
  }, [])
  const categories = [...new Set(books.map(book => book.category))];
  const value = {
    categories,
    books,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
