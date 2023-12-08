import React, { useState } from "react";
import CardsList from "../component/CardList";

const BottonBar = ({ children }) => {
  const [isCardsListVisible, setCardsListVisible] = useState(false);

  const toggleCardsList = () => {
    setCardsListVisible(!isCardsListVisible);
  };

  const closeCardsList = () => {
    setCardsListVisible(false);
  };
  return (
    <header className="w-[847px] h-[712px] flex flex-col justify-between items-center">
      <div className="btnBarTop w-full flex justify-center items-center text-2xl h-[50px] bg-slate-500 z-30">
        <h1>My Pokedex</h1>
      </div>
      <div className="flex flex-wrap gap-3 overflow-auto w-full h-[610px] justify-start item-start p-2">
      {children}
      </div>
      {isCardsListVisible && (
        <>
          <div
            className="fixed w-[847px] h-[712px] z-30 opacity-80 bg-black"
            onClick={closeCardsList}
          ></div>
          <CardsList onClose={closeCardsList} />
        </>
      )}
      <div className="btnBarBottom  bg-slate-500 flex justify-center items-end w-full mix-w-[1024px] h-[50px]">
        <div className="btnBarBottom  bg-slate-500 flex justify-center items-center w-[100px] h-[100px] rounded-full z-30">
          <button className="text-7xl text-white" onClick={toggleCardsList}>
            +
          </button>
        </div>
      </div>
    </header>
  );
};

export default BottonBar;
