import {
  isMatchPokemon,
  mapDispatchToProps,
  Pointer,
  CardImage,
  CuteIcon,
  Card,
} from "./Card";
import React  from "react";
import { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import * as R from "ramda";
import "jest-styled-components";
Enzyme.configure({ adapter: new Adapter() });

describe("Card Component", () => {
  describe("Test style component", () => {
    it("should display the pointer ", () => {
      const component = mount(<Pointer mouse={false} />);

      expect(component).toHaveStyleRule("display", "none");
    });
    it("should display the pointer TEXT X on top right", () => {
      const component = shallow(<Card type="delete" item={{ imageUrl: 1 }} />);

      expect(component.find(Pointer).text()).toEqual("x");
    });
    it("should display the pointer TEXT Add on top right", () => {
      const component = shallow(<Card type="add" item={{ imageUrl: 1 }} />);

      expect(component.find(Pointer).text()).toEqual("Add");
    });

    it("should render List with the correct styles", () => {
      const component = mount(<Pointer mouse={true} />);
      expect(component).toHaveStyleRule("color", "red");
    });
    it("should render List with the correct styles", () => {
      const component = mount(<CuteIcon size="big" />);

      expect(component).toHaveStyleRule("max-width", "50px");
    });

    it("should render List with the correct styles", () => {
      const component = mount(<CardImage size="big" />);

      expect(component).toHaveStyleRule("max-width", "250px");
    });
    it("should call isMatchPokemon", () => {
      const filter = R.filter(isMatchPokemon({ id: 1 }), [{ id: 1 }]);
      expect(filter).toEqual([]);
    });
  });
  describe("Test function dispatch", () => {
    it("should action ADD_POKEMON", () => {
      const dispatch = jest.fn();
      const ownprops = { list: [{ id: 1, name: "Item1", type: "water" }] };
      mapDispatchToProps(dispatch, ownprops).addPokemon({
        id: 1,
        name: "Item1",
        type: "water",
      });
      expect(dispatch.mock.calls[0][0].type).toEqual("ADD_POKEMON");
    });

    it("should action DELETE_POKEMON", () => {
      const dispatch = jest.fn();
      const ownprops = { list: [{ id: 1, name: "Item1", type: "water" }] };
      mapDispatchToProps(dispatch, ownprops).deletePokemon({
        id: 1,
        name: "Item1",
        type: "water",
      });

      expect(dispatch.mock.calls[0][0].type).toEqual("DELETE_POKEMON");
    });

    it("should action ADD_POKEMON_BACK", () => {
      const dispatch = jest.fn();
      const ownprops = { list: [{ id: 1, name: "Item1", type: "water" }] };
      mapDispatchToProps(dispatch, ownprops).addPokemonBack([
        {
          id: 1,
          name: "Item1",
          type: "water",
        },
      ]);
      expect(dispatch.mock.calls).toEqual([]);
    });

    it("should action ADD_POKEMON_BACK", () => {
      const wrapper = shallow(<Card item={[{ id: 1 }]} />);
      expect(wrapper.find(CuteIcon)).toHaveLength(2);
    });

    it("should dispatch select card", () => {
      const dispatch = jest.fn();
      const ownprops = { list: [{ id: 1, name: "Item1", type: "water" }] };
      const add = (item) => {
        return item + "ADD";
      };
      const deletelist = (item) => {
        return item + "delete";
      };
      const addback = (item) => {
        return item + "addback";
      };
      expect(
        mapDispatchToProps(dispatch, ownprops).onSelectCard(
          { id: 1, name: "Item1", type: "water" },
          "add",
          add,
          deletelist,
          addback
        )
      ).toEqual();
      expect(
        mapDispatchToProps(dispatch, ownprops).onSelectCard(
          { id: 1, name: "Item1", type: "water" },
          "delete",
          add,
          deletelist,
          addback
        )
      ).toEqual();
    });
  });
  describe("Toggle mouseover and mouseout state ", () => {
    it("check state", () => {
      const wrapper = shallow(<Card item={{ id: 1 }} />);
      expect(wrapper.find(".carditem").exists).toBeTruthy();
      expect(wrapper.state("mouse")).toBe(false);

      wrapper.find(".carditem").simulate("mouseover");
      expect(wrapper.state("mouse")).toBe(true);

      wrapper.find(".carditem").simulate("mouseout");
      expect(wrapper.state("mouse")).toBe(false);
    });
  });
  describe("Toggle selectCard", () => {
    it("should display the pointer TEXT X on top right", () => {
      const onSelectCard = jest.fn();
      const component = shallow(
        <Card type="add" item={{ imageUrl: 1 }} onSelectCard={onSelectCard} />
      );

      component.find(Pointer).simulate("click");

      expect(onSelectCard).toHaveBeenCalledTimes(1);
    });
  });
});
