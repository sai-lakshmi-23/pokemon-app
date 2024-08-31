// src/redux/sagas.js

import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchPokemons, setPokemons, setPokemonsError } from './pokemonSlice';

function* fetchPokemonsSaga(action) {
  try {
    const response = yield call(axios.get, action.payload.url);
    const results = response.data.results;
    const totalCount = response.data.count;
    const pageSize = 20; // Adjust as needed
    const totalPages = Math.ceil(totalCount / pageSize);
    const currentPage = action.payload.page || 1;

    yield put(setPokemons({
      pokemonList: results,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
      currentPage: currentPage,
      totalPages: totalPages,
    }));
  } catch (error) {
    yield put(setPokemonsError(error.message));
  }
}

function* rootSaga() {
  yield takeLatest(fetchPokemons.type, fetchPokemonsSaga);
}

export default rootSaga;
