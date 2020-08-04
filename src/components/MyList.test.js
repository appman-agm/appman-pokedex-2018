import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./Card";
import MyList from "./MyList";
Enzyme.configure({ adapter: new Adapter() });

describe("My List", () => {
  describe("Render My card List", () => {
    describe("selected list has no value", () => {
      it("should renders zero <Card /> components", () => {
        const wrapper = shallow(<MyList selected={[]} />);
        expect(wrapper.find(Card)).toHaveLength(0);
      });
    });
    describe("selected list has 2 items", () => {
      it("should renders two <Card /> components", () => {
        const wrapper = shallow(<MyList selected={[{ id: 1 }, { id: 2 }]} />);
        expect(wrapper.find(Card)).toHaveLength(2);
      });
    });
  });
});
