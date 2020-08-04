import { mapDispatchToProps, mapStateToProps } from "./App";
import React from "react";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { App } from "./App";
Enzyme.configure({ adapter: new Adapter() });

describe("App.test.js", () => {
  describe("Test Map dispatch to props", () => {
    describe("Test get Pokemon List", () => {
      it("should action SET_SEARCH", () => {
        const dispatch = jest.fn();
        const ownprops = { list: [{ id: 1, name: "Item1", type: "water" }] };
        mapDispatchToProps(dispatch, ownprops).getPokemonList();
        expect(dispatch.mock.calls[0][0].type).toEqual("LIST_FETCH_REQUESTED");
      });
    });
    describe("Test get Clear Filter", () => {
      it("should action CLEAR_FILTER", () => {
        const dispatch = jest.fn();
        const ownprops = { list: [{ id: 1, name: "Item1", type: "water" }] };
        mapDispatchToProps(dispatch, ownprops).clearFilter();
        expect(dispatch.mock.calls[0][0].type).toEqual("CLEAR_FILTER");
      });
    });
  });
  describe("Test modal Function", () => {
    describe("Test close modal", () => {
      it("should change state openModal top be false", () => {
        const wrapper = shallow(<App List={{ List: { list: [{ id: 1 }] } }} />);
        const instance = wrapper.instance();
        instance.handleClose();
        expect(wrapper.state("modal")).toBe(false);
      });
    });
    describe("Test open modal", () => {
      it("should change state openModal top be true", () => {
        const clearFilter = jest.fn();
        const wrapper = shallow(
          <App
            List={{ List: { list: [{ id: 1 }] } }}
            clearFilter={clearFilter}
          />
        );
        const instance = wrapper.instance();
        instance.handleOpen();
        expect(wrapper.state("modal")).toBe(true);
      });
    });
  });
  describe("Test mapStateToProps", () => {
    it("should return init state", () => {
      const init = { item: 1 };
      expect(mapStateToProps(init)).toEqual({ item: 1 });
    });
  });
});
