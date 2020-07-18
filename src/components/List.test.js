import React from "react";
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./Card";
import List from "./List";
Enzyme.configure({ adapter: new Adapter() });

describe("Pokemon List", () => {
  describe("Render Pokemon card List", () => {
    describe("pokemon list has no value", () => {
      it("should renders zero <Card /> components", () => {
        const wrapper = shallow(<List filterList={[]} search={""} list={[]} />);
        expect(wrapper.find(Card)).toHaveLength(0);
      });
    });
    describe("pokemon list has 2 items", () => {
      it("should renders 2 <Card /> components", () => {
        const wrapper = shallow(
          <List filterList={[]} search={""} list={[{ id: 1 }, { id: 1 }]} />
        );
        expect(wrapper.find(Card)).toHaveLength(2);
      });
    });
    describe("input text field", () => {
      it("should renders 1 <Card /> components in filterList", () => {
        const wrapper = shallow(
          <List
            filterList={[{ id: 3 }]}
            search={"a"}
            list={[{ id: 1 }, { id: 1 }]}
          />
        );
        expect(wrapper.find(Card)).toHaveLength(1);
      });
    });
  });
});
