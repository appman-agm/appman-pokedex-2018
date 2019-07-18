import * as R from 'ramda'
import { createSelector } from "reselect";

export const getPokemon = createSelector(
  state=>state.pokemon,
  state=>state.pokedex,
  state=>state.search,
  (pokemon=[],pokedex=[],search='')=>{
    console.log(pokedex)
  if(pokedex.length===0){
    return pokemon
  }

  const identityPokedex = R.map(({nationalPokedexNumber})=>nationalPokedexNumber)(pokedex)
  const filterList = R.filter(({nationalPokedexNumber})=>!R.contains(nationalPokedexNumber,identityPokedex),pokemon)
  console.log('search',search)
    if(search){
      console.log('here')
      return R.filter(
      ({name})=>R.indexOf(name,search)>0,
      )(filterList)
    }
    return filterList
  }
)