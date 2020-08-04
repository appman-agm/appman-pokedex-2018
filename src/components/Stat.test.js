import Stat from './Stat'
import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BorderLinearProgress} from './Stat'
Enzyme.configure({ adapter: new Adapter() });

describe("Stat", () => {
    describe("Render the label from props", () => {
      
      describe("when peops eual Hp", () => {
        it("should renders label with 'Hp'", () => {
          const wrapper = shallow(<Stat label="Hp" />);
          expect(wrapper.find('.label').text()).toEqual('Hp');
        });
      });
    });

    it("should",()=>{
      const wrapper = shallow(<BorderLinearProgress  />);
        expect(wrapper).toHaveLength(1)
    })
  });
