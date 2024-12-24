import { Route, Routes } from 'react-router';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
