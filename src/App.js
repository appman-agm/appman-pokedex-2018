import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cardListSelector, removeCards } from "./store/slices/cardListSlice";

import MyPokedex from "./component/MyPokedex";
import BottonBar from "./component/ButtonBar";
import "./App.css";

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b",
};

const App = () => {
  const dispatch = useDispatch();
  const [datalist, setDatalist] = useState([]);
  const cardList = useSelector(cardListSelector);

  useEffect(() => {
    const initialData = JSON.parse(localStorage.getItem("pokemonList")) || [];
    setDatalist(initialData);
  }, [cardList]);

  const handleRemoveCard = (event) => {
    dispatch(removeCards(event))
    setDatalist(JSON.parse(localStorage.getItem("pokemonList")) || []);
  }

  return (
    <div className="App">
      <BottonBar>
        {datalist.map((card) => (
          <MyPokedex
            key={card.id}
            id={card.id}
            img={card.img}
            name={card.name}
            hp={card.hp}
            str={card.str}
            weak={card.weak}
            happiness={card.happiness}
            type={{ border: `8px solid ${COLORS[card.type]}` }}
            handleRemoveCard={handleRemoveCard}
          />
        ))}
      </BottonBar>
    </div>
  );
};

export default App;
