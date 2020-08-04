import { calHappiness, calWeak, calHp, calStrength } from "./CalStat";
const Pikachu = {
  name: "Pikachu",
  hp: 110,
  attacks: [
    { name: "attack A", damage: "20+" },
    { name: "attack B", damage: "40x" },
  ],
  weaknesses: [{ name: "weakness A" }],
};
const Pikachu2 = {
  name: "Pikachu",
  hp: 110,
  weaknesses: [{ name: "weakness A" }],
};
const Pikachu3 = {
  name: "Pikachu",
  hp: 110,
  attacks: [
    { name: "attack A", damage: "" }
  ],
  weaknesses: [{ name: "weakness A" }],
};
describe("CalStat", () => {
  describe("calculate Hp", () => {
    describe("when hp are more than 100", () => {
      it("should return 100", () => {
        expect(calHp(120)).toBe(100);
      });
    });
    describe("when hp are less than 100", () => {
      it("should return 0", () => {
        expect(calHp(60)).toBe(0);
      });
    });
    describe("when it not have hp", () => {
      it("should return 0", () => {
        expect(calHp()).toBe(0);
      });
    });
  });

  describe("calculate strenght", () => {
    describe("when attack length is 1", () => {
      it("should return 50 ", () => {
        expect(calStrength([""])).toBe(50);
      });
    });
    describe("when attack length is 2", () => {
      it("should return 50 ", () => {
        expect(calStrength(["", ""])).toBe(100);
      });
    });
    describe("when it no attack", () => {
      it("should return 0 ", () => {
        expect(calStrength()).toBe(0);
      });
    });
  });
  describe("Calculate Weak", () => {
    describe("when weak length is 0", () => {
      it("should return 100 ", () => {
        expect(calWeak([])).toBe(0);
      });
    });
    describe("when weak length is 1", () => {
      it("should return 100 ", () => {
        expect(calWeak([""])).toBe(100);
      });
    });
    describe("when weak length are more than 1", () => {
      it("should return 100 ", () => {
        expect(calWeak(["", ""])).toBe(100);
      });
    });
    describe("when weak length are more than 2", () => {
      it("should return 100 ", () => {
        expect(calWeak(["", "", ""])).toBe(100);
      });
    });
    describe("when no weak", () => {
      it("should return 0 ", () => {
        expect(calWeak()).toBe(0);
      });
    });
  });
  describe("Calculate Happiness", () => {
    describe("when item is Pikachu", () => {
      it("should return 5", () => {
        expect(calHappiness(Pikachu).length).toBe(5);
      });
    });
    describe("when item has no attack", () => {
      it("should return 5", () => {
        expect(calHappiness(Pikachu2).length).toBe(4);
      });
    });
    describe("when item has no attack damage", () => {
      it("should return 5", () => {
        expect(calHappiness(Pikachu3).length).toBe(4);
      });
    });
  });
});
