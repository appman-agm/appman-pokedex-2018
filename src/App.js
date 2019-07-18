import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import './App.css'
import { fetchPokemon, OpenModal, removePokedex } from './actions';
import Modal, { CardPokemon } from './components/Modal';

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
  footerBackGround:'#ec5656',
  buttonAdd:'#dc7777'
}
const RootWrapper = styled.div`
  height:100%;
`
const Footer = styled.div`
  height:100px;
  background-color: ${COLORS.footerBackGround};
  width:100%;
  position:absolute;
  bottom: 0;
`
const WrapperHeader = styled.div`
  text-align:center;
  position:relative;
  z-index:1;
`
const ButtonAdd = styled.div`
 background-color: ${COLORS.buttonAdd};
 width:150px;
 height:150px;
 position:absolute;
 bottom: 0;
 z-index:1;
 margin-left: auto;
 margin-right: auto;
 left: 0;
 right: 0;
 border-radius: 100px;
 span {
    z-index:-1;
    display:flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 120px;
    background-color: #ec5656;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: inset 0px 5px 5px rgba(68,68,68,0.6);
    width:100%;
    height:100%;
    padding:0;
  }
`
const OverFLow = styled.div`
  flex-wrap: wrap;
  overflow: scroll;
  height: 85%;
  z-index: -1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
`
class App extends Component {
  componentDidMount(){
    this.props.fetchPokemon()
  }
  render() {
    return (
      <RootWrapper className="App">
        <WrapperHeader>
        <h1>My Pokedex</h1>
        </WrapperHeader>
        <OverFLow>
          {
              this.props.pokedex.map(v=><CardPokemon onDelete={this.props.removePokedex} pokedex={true} key={v.id} {...v} onAdd={this.props.onAdd}/>)
            }
          </OverFLow>
        <Footer>
          <ButtonAdd onClick={this.props.OpenModal}>
            <span>+</span>
          </ButtonAdd>
        </Footer>
        <Modal/>
      </RootWrapper>
    )
  }
}

const mapStateToProps = ({pokedex})=>({
  pokedex,
})
const mapDisPatchToProps =dispatch=>({
  fetchPokemon:()=>dispatch(fetchPokemon()),
  OpenModal:()=>dispatch(OpenModal()),
  removePokedex:(value)=>dispatch(removePokedex(value))
})
export default connect(mapStateToProps,mapDisPatchToProps)(App)
