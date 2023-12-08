import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../api.js";

const initialState = {
  pokemonList: [],
};

export const cardListSlice = createSlice({
  name: "cardList",
  initialState,
  reducers: {
    setPokemonList: (state, action) => {
      const pokemonData = action.payload;

      
      
      if (Array.isArray(pokemonData) && pokemonData.length > 0) {
        const processedData = pokemonData.map((pokemon) => {
          const { id, imageUrl, name, hp, attacks, weaknesses ,type } = pokemon;

          const hpValue = hp > 100 ? 100 : hp === "None" ? 0 : parseInt(hp);

          const strLevel =
            Array.isArray(attacks) && attacks.length > 0
              ? attacks.length * 50 > 100
                ? 100
                : attacks.length * 50
              : 0;

          const weakLevel =
            Array.isArray(weaknesses) && weaknesses.length > 0
              ? weaknesses.length * 100 > 100
                ? 100
                : weaknesses.length * 100
              : 0;

          const totalDamage = calculateDamage(attacks);

          const happiness = happinessLevel(hpValue, totalDamage, weakLevel);

          return {
            id,
            imageUrl,
            name,
            hpValue,
            strLevel,
            weakLevel,
            happiness,
            type
          };
        });

        state.pokemonList = processedData;
      }
    },
    addCards: (state, action) => {
      const newCard = action.payload;
      const savedPokemonList =
        JSON.parse(localStorage.getItem("pokemonList")) || [];
      savedPokemonList.push(newCard);

      localStorage.setItem("pokemonList", JSON.stringify(savedPokemonList));
    },
    removeCards: (state, action) => {
      const cardIdToRemove = action.payload;
      const storedData = JSON.parse(localStorage.getItem("pokemonList"));

      const updatedData = storedData.filter(
        (item) => item.id !== cardIdToRemove
      );

      localStorage.setItem("pokemonList", JSON.stringify(updatedData));
    },
  },
});

const calculateDamage = (attacks) => {
  if (!Array.isArray(attacks)) {
    return 0;
  } else {
    let totalDamage = 0;
    for (let i = 0; i < attacks.length; i++) {
      const damageString = attacks[i].damage;
      const numericValue = parseInt(damageString);
      const damageValue = isNaN(numericValue) ? 0 : numericValue;
      totalDamage += damageValue;
    }
    return totalDamage;
  }
};

const happinessLevel = (hpValue, damageValue, weakValue) => {
  return Math.round(
    (hpValue / 10 + damageValue / 10 + 10 - weakValue / 100) / 5
  );
};

export const fetchCards = () => async (dispatch) => {
  try {
    const response = (await getData()).data.cards;

    const savedPokemonList =
      JSON.parse(localStorage.getItem("pokemonList")) || [];

    const uniqueData = response.filter(
      (item2) => !savedPokemonList.some((item1) => item1.id === item2.id)
    );

    dispatch(setPokemonList(uniqueData));
  } catch (error) {
    console.error("Error fetching card list:", error);
  }
};

export const { setPokemonList, addCards, removeCards } = cardListSlice.actions;
export const cardListSelector = (state) => state.cardList.pokemonList;
export default cardListSlice.reducer;
