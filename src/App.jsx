import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import Search from './components/Search';
import PokemonDetail from './components/PokemonDetail';
import './App.css';

const NavigationBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/pokedex">Pokédex</Link> 
      <Link to="/search">Search</Link>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/search" element={<Search />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 