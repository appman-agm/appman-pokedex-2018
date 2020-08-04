import {
  GET_LIST_SUCCESS,
  ADD_POKEMON,
  DELETE_POKEMON,
  CLEAR_FILTER,
  SET_SEARCH,
  ADD_POKEMON_BACK,
  GET_LIST_FAIL,
  LIST_LOADING,
} from "../actions/ActionType";
import * as R from "ramda";
const initialState = {
  selected: [],
  list: [],
  filterList: [],
  loading: false,
};
const isMatchPokemon = (data) => {
  return (item) => item.id !== data.id;
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_SUCCESS: {
      return R.assocPath(["list"], action.payload)(state);
    }
    case GET_LIST_FAIL: {
      return R.assocPath(["list"], [])(state);
    }
    case ADD_POKEMON: {
      return R.pipe(
        R.assocPath(
          ["list"],
          R.filter(isMatchPokemon(action.payload), state.list)
        ),
        R.assocPath(
          ["filterList"],
          R.filter(isMatchPokemon(action.payload), state.filterList)
        ),
        action.payload !== undefined
          ? R.assocPath(["selected"], R.append(action.payload, state.selected))
          : R.assocPath(["selected"], R.pathOr([], ["payload"], action))
      )(state);
    }
    case DELETE_POKEMON: {
      return R.assocPath(
        ["selected"],
        R.filter(isMatchPokemon(action.payload), state.selected)
      )(state);
    }
    case CLEAR_FILTER: {
      return R.assocPath(["filterList"], [])(state);
    }
    case SET_SEARCH: {
      return R.assocPath(["filterList"], action.payload)(state);
    }
    case LIST_LOADING: {
      return R.assocPath(["loading"], action.payload)(state);
    }
    case ADD_POKEMON_BACK: {
      if (action.payload) {
        return {
          ...state,
          list: action.payload.filter(
            ({ id: id1 }) => !state.selected.some(({ id: id2 }) => id2 === id1)
          ),
        };
      } else {
        return { ...state };
      }
    }
    default:
      return state;
  }
}
