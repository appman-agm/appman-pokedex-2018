import React, { Component } from 'react'
import axios from 'axios';
import * as R from 'ramda'
import './App.css'

import Modal from './Modal'
import ShowCard from './ShowCard'

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
  Fire: "#eb4d4b"
}




class App extends Component {
  state = { show: false };
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onChange = (e) => {
    console.log('cff', e.target.value)
    console.log('find', this.state)
    this.setState({ valueFilter: e.target.value})

  }

  getItemListAndShowCard = () => {
    axios.get(`http://localhost:3030/api/cards`).then(res => {
    const card = res.data.cards;
    this.setState({ card, show: true});
  });
  }

  addToPokedex = (item) => {
    const currentSelect = this.state.selectedList
    const newSelected = R.append(item, currentSelect)
    this.setState({ selectedList: newSelected})
    this.forceUpdate()
    this.setState({ showCard: true})
  }

  removeFromPokedex = (idItem) => {
    const currentSelect = this.state.selectedList
    const newRemoved = R.filter(item => item.id !== idItem, currentSelect)
    this.setState({ selectedList: newRemoved})
  }
  
  render() {  
    const { selectedList = [], show, card, showCard, valueFilter } = this.state
    return (
      <div className="App">
        <Modal 
          COLORS={COLORS} 
          show={show} 
          handleClose={this.hideModal} 
          card={card} 
          setPokedex={this.addToPokedex}
          currentSelect={selectedList}
          _onChange={this.onChange}
          valueFilter = {valueFilter}
        >
        </Modal>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: COLORS.Colorless, height: '768px', width: '1024px'}}>
          <div id="pokedex" style={{ width: '1024px', height: '100px', backgroundColor: COLORS.Colorless, border: '1px solid transparent', top: 0, position: 'absolute' }} >
            <h1 style={{ textAlign: 'center' ,fontSize: '45px'}}>My Pokedex</h1>
          </div>
          <div id="pokedex" style={{ width: '1024px', height: '568px', backgroundColor: COLORS.Colorless, border: '1px solid transparent', top: 100, position: 'absolute', zIndex:1 }}>
          {  showCard && <ShowCard
            COLORS={COLORS} 
            currentSelect={selectedList}
            remove={this.removeFromPokedex}
          >
          </ShowCard>}
          </div>
          <div id="pokedex" 
            style={{ 
              width: '1024px', 
              height: '100px', 
              border: `1px solid ${COLORS.Fire}`, 
              top: 668, 
              position: 'absolute',
              backgroundColor: COLORS.Fire
          }}>
            <div style={{ 
              width: '200px', 
              height: '200px', 
              border: `1px solid ${COLORS.Fire}`, 
              bottom: 0,left: '400px', 
              borderRadius: '100px', 
              position: 'absolute',
              backgroundColor: COLORS.Fire,
              zIndex: 1
            }} 
              onClick={this.getItemListAndShowCard}
            >
              <h1 style={{
                textAlign: 'center',
                fontSize: '70px'
                }}>+</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
