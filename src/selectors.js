import * as R from 'ramda'
import { createSelector } from "reselect";

export const getPokemon = createSelector(
  state=>state.pokemon,
  state=>state.pokedex,
  (pokemon=[],pokedex=[])=>{
    console.log(pokedex)
  if(pokedex.length===0){
    return pokemon
  }
  const identityPokedex = R.map(({nationalPokedexNumber})=>nationalPokedexNumber)(pokedex)
  console.log(identityPokedex)
  
  return R.filter(({nationalPokedexNumber})=>!R.contains(nationalPokedexNumber,identityPokedex),pokemon)
  }
)