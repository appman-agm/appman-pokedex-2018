import {
  GET_LIST,
  ADD_POKEMON,
  DELETE_POKEMON,
  CLEAR_FILTER,
  SET_SEARCH,
  ADD_POKEMON_BACK,
} from "./ActionType";

import * as R from "ramda";
import getPokemonList from "../services/getPokemonList";
const isMatchPokemon = (data) => {
  return (item) => item.id !== data.id;
};

export const getList = () => {
  return async (dispatch, getState) => {
    try {
      const data = await getPokemonList();

      dispatch({ type: GET_LIST, payload: data });
    } catch (err) {
      console.log(err);
      // dispatch({ type: "GETITEM_FAIL" });
    }
  };
};

export const addPokemon = (data) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const list = R.pathOr([], ["List", "list"], state);

      const newList = R.filter(isMatchPokemon(data), list);
      const newFilter = R.filter(
        isMatchPokemon(data),
        getState().List.filterList
      );

      dispatch({ type: ADD_POKEMON, payload: { data, newFilter, newList } });
    } catch (err) {
      console.log(err);
      // dispatch({ type: "GETITEM_FAIL" });
    }
  };
};

export const deletePokemon = (data) => {
  return async (dispatch, getState) => {
    try {
      const newselected = R.filter(
        isMatchPokemon(data),
        getState().List.selected
      );
      dispatch({ type: DELETE_POKEMON, payload: { newselected } });
    } catch (err) {
      console.log(err);
      // dispatch({ type: "GETITEM_FAIL" });
    }
  };
};
export const addPokemonBack = (data) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("http://localhost:3030/api/cards");
      const dataRes = await response.json();

      const result = ({ id: id1 }) =>
        !getState().List.selected.some(({ id: id2 }) => id2 === id1);

      const newselected = R.filter(result, dataRes.cards);
      
      dispatch({ type: ADD_POKEMON_BACK, payload: newselected });
    } catch (err) {
      console.log(err);
      // dispatch({ type: "GETITEM_FAIL" });
    }
  };
};
export const searchPokemon = (searchText) => {
  return async (dispatch, getState) => {
    try {
      if (searchText === "") {
        dispatch({ type: CLEAR_FILTER });
      } else {
        const isMatchTypeAndName = ({ name, type }) =>
          name.toLowerCase().includes(searchText.toLowerCase()) ||
          type.toLowerCase().includes(searchText.toLowerCase());
        const list = R.pathOr([], ["List", "list"], getState());
        const search = R.filter(isMatchTypeAndName, list);

        dispatch({ type: SET_SEARCH, payload: search });
      }
    } catch (err) {
      console.log(err);
      // dispatch({ type: "GETITEM_FAIL" });
    }
  };
};
export const clearFilterList = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CLEAR_FILTER });
    } catch (err) {
      console.log(err);
      // dispatch({ type: "GETITEM_FAIL" });
    }
  };
};
