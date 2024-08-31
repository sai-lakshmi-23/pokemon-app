// src/PokemonCard.js

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../styles/PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemon.url);
        setImageUrl(response.data.sprites.front_default);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon.url]);

  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={pokemon.name} className="pokemon-image" />
      <h3 className="pokemon-name">{pokemon.name}</h3>
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default PokemonCard;
