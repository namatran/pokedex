import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PokemonDetail.css';

function PokemonDetail() {
  const { name } = useParams();  // Get Pokemon name from URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pokemon) return <p>Pokemon not found</p>;

  return (
    <div className="detail-container">
      <Link to="/pokedex" className="back-button">← Back to Pokédex</Link>
      
      <div className="detail-card">
        <h1 className="detail-name">{pokemon.name}</h1>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="detail-image"
        />
        
        <div className="detail-info">
          <div className="info-section">
            <p><strong>Height:</strong> {pokemon.height}</p>
            <p><strong>Weight:</strong> {pokemon.weight}</p>
          </div>
          
          <div className="info-section">
            <p><strong>Abilities:</strong></p>
            <ul>
              {pokemon.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
          
          <div className="info-section">
            <p><strong>Types:</strong></p>
            <div className="types">
              {pokemon.types.map((type, index) => (
                <span key={index} className={`type-badge type-${type.type.name}`}>
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;