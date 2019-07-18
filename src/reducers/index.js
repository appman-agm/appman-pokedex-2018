import { combineReducers } from 'redux';
import pokemon from './pokemon'
import pokedex from './pokedex'
import ui from './ui'

export default combineReducers({
  pokemon,
  pokedex,
  ui
})