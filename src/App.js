import React, { useState, useEffect } from 'react'
import './App.css'
import searchIcon from './search.png'
import cuteIcon from './cute.png'

const COLORS = {
  Psychic: '#f8a5c2',
  Fighting: '#f0932b',
  Fairy: '#c44569',
  Normal: '#f6e58d',
  Grass: '#badc58',
  Metal: '#95afc0',
  Water: '#3dc1d3',
  Lightning: '#f9ca24',
  Darkness: '#574b90',
  Colorless: '#FFF',
  Fire: '#eb4d4b',
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [myCards, setMyCards] = useState([])
  const [cards, setCards] = useState([])
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3030/api/cards?name=${searchKey}`)
      .then(res => res.json())
      .then(result => {
        setCards(result.cards)
      })
  }, [searchKey])

  useEffect(() => {
    fetch('http://localhost:3030/api/cards')
      .then(res => res.json())
      .then(result => {
        console.log(result.cards)
        setCards(result.cards)
      })
  }, [])

  const getStats = card => {
    const hp = Math.max(Math.min(card.hp, 100), 0)
    const strength = Math.min(card.attacks.length * 50, 100)
    const weakness = Math.min(card.weaknesses.length * 100, 100)
    const damage = card.attacks
      .map(attack => Number(attack.damage.match(/\d/g).join('')))
      .reduce((a, b) => a + b, 0)
    const happiness = (hp / 10 + damage / 10 + 10 - weakness) / 5

    return {
      hp,
      strength,
      weakness,
      damage,
      happiness,
    }
  }

  const removeCard = index => {
    const tempMyCards = [...myCards]
    tempMyCards.splice(index, 1)
    setMyCards(tempMyCards)
  }

  return (
    <div className="App">
      <h1>My Pokedex</h1>
      <div className="my_card_outer_container">
        {myCards.map((card, index) => (
          <div className="my_card_container" key={card.id}>
            <div className="my_card_stats">
              <img className="my_card_image" src={card.imageUrl} />
              <div className="my_card_stats_details">
                <h2>{card.name.toUpperCase()}</h2>
                <div className="my_stat_item">
                  HP
                  <div className="my_stat_bar"></div>
                </div>
                <div className="my_stat_item">
                  STR
                  <div className="my_stat_bar"></div>
                </div>
                <div className="my_stat_item">
                  WEAK
                  <div className="my_stat_bar"></div>
                </div>
                <div className="stat_happiness_container">
                  <img className="happiness_icon" src={cuteIcon} />
                  <img className="happiness_icon" src={cuteIcon} />
                  <img className="happiness_icon" src={cuteIcon} />
                  <img className="happiness_icon" src={cuteIcon} />
                  <img className="happiness_icon" src={cuteIcon} />
                </div>
              </div>
            </div>
            <button className="remove_button" onClick={() => removeCard(index)}>
              X
            </button>
          </div>
        ))}
      </div>

      <div id="bottom_bar">
        <button id="bottom_bar_button" onClick={() => setIsModalOpen(true)}>
          +
        </button>
      </div>
      {isModalOpen && (
        <div
          id="modal_container"
          onClick={() => {
            setIsModalOpen(false)
          }}
        >
          <div
            id="modal_content"
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <div id="modal_search_container">
              <input
                type="text"
                id="modal_search"
                placeholder="Find pokemon"
                onChange={e => {
                  setSearchKey(e.target.value)
                }}
                value={searchKey}
              />
              <img id="model_search_icon" src={searchIcon} />
            </div>
            {cards.map(card => (
              <div className="card_container" key={card.id}>
                <div className="card_stats">
                  <div className="card_stats_left">
                    <img className="card_image" src={card.imageUrl} alt="" />

                    <div className="card_stats_detail">
                      <h2>{card.name.toUpperCase()}</h2>
                      <div className="stat_item">
                        HP
                        <div className="stat_bar"></div>
                      </div>
                      <div className="stat_item">
                        STR
                        <div className="stat_bar"></div>
                      </div>
                      <div className="stat_item">
                        WEAK
                        <div className="stat_bar"></div>
                      </div>
                      <div className="stat_happiness_container">
                        <img className="happiness_icon" src={cuteIcon} />
                        <img className="happiness_icon" src={cuteIcon} />
                        <img className="happiness_icon" src={cuteIcon} />
                        <img className="happiness_icon" src={cuteIcon} />
                        <img className="happiness_icon" src={cuteIcon} />
                      </div>
                    </div>
                  </div>
                  <button
                    className="add_button"
                    onClick={() => {
                      setMyCards([...myCards, card])
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
