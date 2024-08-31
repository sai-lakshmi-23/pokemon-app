// src/redux/pokemonSlice.js

import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonList: [],
    filteredPokemons: [],
    nextUrl: null,
    prevUrl: null,
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    fetchPokemons: (state) => {
      state.status = 'loading';
    },
    setPokemons: (state, action) => {
      state.pokemonList = action.payload.pokemonList;
      state.filteredPokemons = action.payload.pokemonList;
      state.nextUrl = action.payload.nextUrl;
      state.prevUrl = action.payload.prevUrl;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.status = 'succeeded';
    },
    setPokemonsError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    setSearchTerm: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredPokemons = state.pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { fetchPokemons, setPokemons, setPokemonsError, setSearchTerm, setPage } = pokemonSlice.actions;

export default pokemonSlice.reducer;
