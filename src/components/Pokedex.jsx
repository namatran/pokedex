import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Pokedex.css'

const Pokedex = () => {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
        }
        const data = await response.json();
        setPokemon(data.results);
      } catch (error) {
        setError(error.message);  
        console.error('Error fetching Pokemon:', error);
      }
    };

    fetchData();
  }, []);

    if (error) return <p>Error: {error}</p>;
    if (!pokemon) return <p>Loading...</p>;

  return (
  <div className="pokedex-container">
    {pokemon.map((pokemon, index) => (
      <Link to={`/pokemon/${pokemon.name}`} key={index} className="pokemon-link">
        <div key={index} className="pokemon">
          <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            alt={pokemon.name}
            className="pokemon-image"
          />
          <p className="pokemon-number">#{String(index + 1).padStart(3, '0')}</p>
          <h3 className="pokemon-name">{pokemon.name}</h3>
        </div>
      </Link>
    ))}
  </div>
);
}

export default Pokedex
