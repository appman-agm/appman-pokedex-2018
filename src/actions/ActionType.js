export const GET_LIST_SUCCESS = "GET_LIST_SUCCESS";
export const ADD_POKEMON = "ADD_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const SET_SEARCH = "SET_SEARCH";
export const ADD_POKEMON_BACK = "ADD_POKEMON_BACK";
export const CLEAR_FILTER_LIST = "CLEAR_FILTER_LIST";
export const GET_LIST_FAIL = "GET_LIST_FAIL";
export const LIST_LOADING = "LIST_LOADING";

export const loadingList = (isLoading) => {
  return {
    type: LIST_LOADING,
    payload: isLoading,
  };
};
export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  };
};

export const getPokemonList = (data) => {
  
  return {
    type: GET_LIST_SUCCESS,
    payload: data,
  };
};

export const searchPokemonFromList = (data) => {
  return { type: SET_SEARCH, payload: data };
};

export const addPokemonToSelectedList = (data) => {
  
  return {
    type: ADD_POKEMON,
    payload: data,
  };
};

export const deletePokemonFromSelectedList = (data) => {
  return {
    type: DELETE_POKEMON,
    payload: data,
  };
};

export const addPokemonBackToList = (data) => {
  return {
    type: ADD_POKEMON_BACK,
    payload: data,
  };
};

export const getPokemonListFail = () => {
  return {
    type: GET_LIST_FAIL,
  };
};
