import { Route, Routes } from 'react-router';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import AllBooks from './Pages/AllBooks';
import PerBooks from './Pages/PerBooks';
import AddBook from './Pages/AddBook';
import PrivateRoute from './Pages/PrivateRoute';
import BorrowedBooks from './Pages/BorrowedBooks';
import Login from './Components/Login';
import Register from './Components/Register';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext';


function App() {
  const { user } = useContext(AppContext)
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/book/:id" element={<PrivateRoute element={<PerBooks />} />} />
        <Route path="/addbooks" element={<PrivateRoute element={<AddBook />} />} />
        <Route path="/borrowedbooks" element={<PrivateRoute element={<BorrowedBooks />} />} />
        {!user && <Route path="/login" element={<Login />} />}
        {!user && <Route path="/register" element={<Register />} />}
      </Routes>
      <Footer />
    </>
  );
}

export default App;