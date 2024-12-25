import { Route, Routes } from 'react-router';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
