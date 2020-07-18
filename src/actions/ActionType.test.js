// import * as actions from "../../actions/TodoActions";
import * as types from "./ActionType";

const data = {
  name: "Pikachu",
  hp: 110,
  attacks: [
    { name: "attack A", damage: "20+" },
    { name: "attack B", damage: "40x" },
  ],
  weaknesses: [{ name: "weakness A" }],
};
describe("Test Action Creators", () => {
  describe("GET_LIST_SUCCESS", () => {
    it("should create an action to get Pokemon success", () => {
      const expectedAction = {
        type: types.GET_LIST_SUCCESS,
        payload: [],
      };
      expect(types.getPokemonList([])).toEqual(expectedAction);
    });
  });
  describe("GET_LIST_FAIL", () => {
    it("should create an action to get Pokemon FAIL", () => {
      const expectedAction = {
        type: types.GET_LIST_FAIL,
      };
      expect(types.getPokemonListFail()).toEqual(expectedAction);
    });
  });
  describe("ADD_POKEMON", () => {
    it("should create an action to add Pokemon", () => {
      const expectedAction = {
        type: types.ADD_POKEMON,
        payload: data,
      };
      expect(types.addPokemonToSelectedList(data)).toEqual(expectedAction);
    });
  });

  describe("SET_SEARCH", () => {
    it("should create an action to search Pokemon", () => {
      const expectedAction = {
        type: types.SET_SEARCH,
        payload: data,
      };
      expect(types.searchPokemonFromList(data)).toEqual(expectedAction);
    });
  });

  describe("DELETE_POKEMON", () => {
    it("should create an action to delete Pokemon", () => {
      const expectedAction = {
        type: types.DELETE_POKEMON,
        payload: data,
      };
      expect(types.deletePokemonFromSelectedList(data)).toEqual(expectedAction);
    });
  });
  describe("ADD_POKEMON_BACK", () => {
    it("should create an action to delete Pokemon", () => {
      const expectedAction = {
        type: types.ADD_POKEMON_BACK,
        payload: data,
      };
      expect(types.addPokemonBackToList(data)).toEqual(expectedAction);
    });
  });
  describe("CLEAR_FILTER", () => {
    it("should create an action to clear the filterList", () => {
      const expectedAction = {
        type: types.CLEAR_FILTER,
      };
      expect(types.clearFilter()).toEqual(expectedAction);
    });
  });
});
