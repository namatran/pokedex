import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

function Search() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch all Pokemon
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Pokemon based on search using useMemo
  const filteredPokemon = useMemo(() => {
    if (search === "") return [];
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, pokemon]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="pokedex-container">  {/* ← Changed from results-container */}
        {search === "" ? (
          <p className="search-prompt">Start typing to search Pokemon...</p>
        ) : filteredPokemon.length === 0 ? (
          <p className="no-results">No Pokemon found</p>
        ) : (
          filteredPokemon.map((poke, index) => (
            <Link to={`/pokemon/${poke.name}`} key={index} className="pokemon-link">
                <div key={index} className="pokemon">  {/* ← Changed from pokemon-card */}
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.indexOf(poke) + 1}.png`}
                    alt={poke.name}
                    className="pokemon-image"
                />
                <p className="pokemon-number">#{String(pokemon.indexOf(poke) + 1).padStart(3, '0')}</p>
                <h3 className="pokemon-name">{poke.name}</h3>
                </div>
            </Link>
          ))
        )}
      </div>
      
    </div>
  );
}

export default Search;