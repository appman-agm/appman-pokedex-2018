import { PokemonList, mapDispatchToProps } from "./Modal";
import React from "react";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

describe("Modal", () => {
  describe("type input the textField", () => {
    it("should call serachPokemon", () => {
      const searchPokemon = jest.fn();
      const wrapper = shallow(<PokemonList searchPokemon={searchPokemon} />);
      const input = wrapper.find(".Text-field");
      expect(input.props().variant).toEqual("outlined");
      input.simulate("change", {
        target: { name: "searchField", value: "Hello" },
      });
      expect(searchPokemon).toHaveBeenCalledTimes(1);
    });

    it("should action SET_SEARCH", () => {
      const dispatch = jest.fn();
      const ownprops = { list: [{ id: 1, name: "Item1", type: "water" }] };
      mapDispatchToProps(dispatch, ownprops).searchPokemon("a");
      expect(dispatch.mock.calls[0][0].type).toEqual("SET_SEARCH");
    });

    it("should action CLEAR_FILTER", () => {
      const dispatch = jest.fn();
      const ownprops = { list: [{ id: 1, name: "Item1", type: "water" }] };
      mapDispatchToProps(dispatch, ownprops).searchPokemon("");
      expect(dispatch.mock.calls[0][0].type).toEqual("CLEAR_FILTER");
    });
  });
});
