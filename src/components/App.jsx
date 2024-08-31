// src/App.js

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons, setSearchTerm } from '../redux/pokemonSlice';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import '../styles/App.css';
import { POKEMON_API } from '../utilities/constants';

const App = () => {
  const dispatch = useDispatch();
  // const pokemonList = useSelector((state) => state.pokemon.pokemonList);
  const filteredPokemons = useSelector((state) => state.pokemon.filteredPokemons);
  const nextUrl = useSelector((state) => state.pokemon.nextUrl);
  const prevUrl = useSelector((state) => state.pokemon.prevUrl);
  const status = useSelector((state) => state.pokemon.status);
  const error = useSelector((state) => state.pokemon.error);
  const currentPage = useSelector((state) => state.pokemon.currentPage);
  const totalPages = useSelector((state) => state.pokemon.totalPages);

  useEffect(() => {
    dispatch(fetchPokemons({ url: `${POKEMON_API}`, page: 1 }));
  }, [dispatch]);

  const handleNext = () => {
    if (nextUrl) {
      dispatch(fetchPokemons({ url: nextUrl, page: currentPage + 1 }));
    }
  };

  const handlePrevious = () => {
    if (prevUrl) {
      dispatch(fetchPokemons({ url: prevUrl, page: currentPage - 1 }));
    }
  };

  const handlePageChange = (page) => {
    dispatch(fetchPokemons({ url: `${POKEMON_API}&offset=${(page - 1) * 20}`, page }));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const getPagination = () => {
    const pages = [];
    // const maxPagesToShow = 5; // Maximum number of page buttons to display
    const startPage = 1;
    const endPage = totalPages;
    const pageLimit = 2;

    // Add first page
    pages.push(startPage);

    // Add dots if necessary
    if (currentPage > pageLimit + 2) {
      pages.push('...');
    }

    // Add pages around the current page
    for (let i = Math.max(currentPage - pageLimit, startPage + 1); i <= Math.min(currentPage + pageLimit, endPage - 1); i++) {
      pages.push(i);
    }

    // Add dots if necessary
    if (currentPage < endPage - pageLimit - 1) {
      pages.push('...');
    }

    // Add last page
    if (endPage > 1) {
      pages.push(endPage);
    }

    return pages;
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <h1>Pokemon List</h1>
      <SearchBar onSearchChange={handleSearchChange} />
      <div className="pokemon-container">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map(pokemon => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))
        ) : (
          <div className="no-results">Pokemon not found</div>
        )}
      </div>
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        {getPagination().map((page, index) => (
          page === '...' ? (
            <span key={index} className="pagination-ellipsis">...</span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          )
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
