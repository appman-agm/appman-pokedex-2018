import reducer from "./ListReducer";
import * as types from "../actions/ActionType";

describe("List reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      filterList: [],
      list: [],
      loading: false,
      selected: [],
    });
  });

  describe("ADD_POKEMON", () => {
    describe("when no item added", () => {
      it("should return the initial state", () => {
        expect(
          reducer(undefined, { type: "ADD_POKEMON", payload: undefined })
        ).toEqual({
          filterList: [],
          list: [],
          loading: false,
          selected: [],
        });
      });
    });
    describe("when add 1 item", () => {
      it("should return ", () => {
        expect(
          reducer(
            { filterList: [], list: [{ id: 1 }, { id: 2 }], selected: [] },
            {
              type: "ADD_POKEMON",
              payload: { id: 2 },
            }
          )
        ).toEqual({
          filterList: [],
          list: [{ id: 1 }],
          selected: [{ id: 2 }],
        });
      });
    });
    describe("when add another item", () => {
      it("should return selected array with length of 2", () => {
        expect(
          reducer(
            {
              filterList: [],
              list: [{ id: 1 }],
              selected: [{ id: 2 }],
            },
            {
              type: "ADD_POKEMON",
              payload: { id: 1 },
            }
          )
        ).toEqual({
          filterList: [],
          list: [],
          selected: [{ id: 2 }, { id: 1 }],
        });
      });
    });
  });
  describe("DELETE_POKEMON", () => {
    describe("when no item deleted", () => {
      it("should return the initial state", () => {
        expect(
          reducer(undefined, { type: "DELETE_POKEMON", payload: undefined })
        ).toEqual({
          filterList: [],
          list: [],
          loading: false,
          selected: [],
        });
      });
    });
    describe("when delete 1 item", () => {
      it("should return selected with array length of 1", () => {
        expect(
          reducer(
            { filterList: [], list: [], selected: [{ id: 1 }, { id: 2 }] },
            {
              type: "DELETE_POKEMON",
              payload: { id: 2 },
            }
          )
        ).toEqual({
          filterList: [],
          list: [],
          selected: [{ id: 1 }],
        });
      });
    });
  });
  describe("ADD_POKEMON_BACK", () => {
    describe("when no item add back", () => {
      it("should return the initial state", () => {
        expect(
          reducer(undefined, { type: "ADD_POKEMON_BACK", payload: undefined })
        ).toEqual({
          filterList: [],
          list: [],
          loading: false,
          selected: [],
        });
      });
    });
    describe("when add item back after delete ", () => {
      it("should return the list that contain items", () => {
        expect(
          reducer(
            { filterList: [], list: [], selected: [{ id: 1 }, { id: 2 }] },
            { type: "ADD_POKEMON_BACK", payload: [{ id: 1 }] }
          )
        ).toEqual({
          filterList: [],
          list: [],
          selected: [{ id: 1 }, { id: 2 }],
        });
      });
    });
  });

  describe("GET_LIST_SUCCESS", () => {
    describe("when get item from api", () => {
      it("should return the state with list", () => {
        
        expect(reducer({ list: 1 }, { type: types.GET_LIST_SUCCESS,payload:[{id:1}]  })).toEqual({
          list: [{id:1}],
        });
      });
    });
  });

  describe("LIST_LOADING", () => {
    describe("loading list api", () => {
      it("should return the state with loading true", () => {
        expect(
          reducer(
            { filterList: [], list: [], loading: false, selected: [] },
            { type: "LIST_LOADING", payload: true }
          )
        ).toEqual({
          filterList: [],
          list: [],
          loading: true,
          selected: [],
        });
      });
    });
  });

  describe("GET_LIST_FAIL", () => {
    describe("when get item from api", () => {
      it("should return the state with list", () => {
        expect(
          reducer(
            { filterList: [], list: [], loading: false, selected: [] },
            { type: "GET_LIST_FAIL" }
          )
        ).toEqual({
          filterList: [],
          list: [],
          loading: false,
          selected: [],
        });
      });
    });
  });

  describe("CLEAR_FILTER", () => {
    describe("when open the list", () => {
      it("should return the state with empty filterlist", () => {
        expect(
          reducer(
            {
              filterList: [{ id: 1 }, { id: 2 }],
              list: [{ id: 3 }],
              loading: false,
              selected: [],
            },
            { type: "CLEAR_FILTER" }
          )
        ).toEqual({
          filterList: [],
          list: [{ id: 3 }],
          loading: false,
          selected: [],
        });
      });
    });
  });

  describe("SET_SEARCH", () => {
    describe("when search list", () => {
      it("should return the state with filter list", () => {
        expect(
          reducer(
            {
              filterList: [],
              list: [{ id: 1 }, { id: 2 }, { id: 3 }],
              loading: false,
              selected: [],
            },
            { type: "SET_SEARCH", payload: [{ id: 1 }] }
          )
        ).toEqual({
          filterList: [{ id: 1 }],
          list: [{ id: 1 }, { id: 2 }, { id: 3 }],
          loading: false,
          selected: [],
        });
      });
    });
  });
});
