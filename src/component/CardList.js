import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cardListSelector,
  fetchCards,
  addCards,
} from "../store/slices/cardListSlice";
import searchIcon from "../assets/search.png";
import Card from "./Card";

const CardList = () => {
  const dispatch = useDispatch();
  const datalist = useSelector(cardListSelector);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch, datalist]);

  useEffect(() => {
    if (searchTerm === "") {
      setCardList(datalist);
    } else {
      const filteredCards = datalist.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCardList(filteredCards);
    }
  }, [searchTerm, datalist]);

  const handleAddCard = (event) => {
    const newCard = {
      id: event.id,
      img: event.img,
      name: event.name,
      hp: event.hp,
      str: event.str,
      weak: event.weak,
      happiness: event.happiness,
      type: event.type
    };
    console.log(newCard)
    dispatch(addCards(newCard));
  };

  return (
    <main className="absolute z-30 w-[750px] h-[710px] bg-white flex flex-col gap-3 py-3 justify-center items-center left-1/2 top-2/4 transform -translate-x-1/2 -translate-y-1/2 bg-transparent">
      <div className="w-full h-screen overflow-x-auto">
        <div className="w-full h-[60px] flex flex-col items-center fixed z-40 bg-white">
          <input
            type="text"
            className="searchBoxBorder w-[95%] mt-2 h-[50px] p-3 text-black"
            placeholder="Find pokemon"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={searchIcon}
            className="absolute top-2 right-5 w-[50px]"
            alt="searchIcon"
          />
        </div>
        <div className="w-full flex flex-col items-center gap-3 mt-16">
          {cardList.map((cardData) => (
            <Card
              key={cardData.id}
              id={cardData.id}
              img={cardData.imageUrl}
              name={cardData.name}
              hp={cardData.hpValue}
              str={cardData.strLevel}
              weak={cardData.weakLevel}
              happiness={cardData.happiness}
              type={cardData.type}
              handleAddCard={handleAddCard}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CardList;
