import { Route, Routes } from 'react-router';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import AllBooks from './Pages/AllBooks';
import PerBooks from './Pages/PerBooks';
import AddBook from './Pages/AddBook';
import BorrowedBooks from './Pages/BorrowedBooks';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/book/:id" element={<PerBooks />} />
        <Route path="/addbooks" element={<AddBook />} />
        <Route path="/borrowedbooks" element={<BorrowedBooks />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
