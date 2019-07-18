import { combineReducers } from 'redux';
import pokemon from './pokemon'
import pokedex from './pokedex'
import ui from './ui'
import search from './search'

export default combineReducers({
  pokemon,
  pokedex,
  ui,
  search,
})