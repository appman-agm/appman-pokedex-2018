import * as R from 'ramda'
import { createSelector } from "reselect";

export const getPokemon = createSelector(
  state=>state.pokemon,
  state=>state.pokedex,
  state=>state.search,
  (pokemon=[],pokedex=[],search='')=>{
    (pokedex)
  if(pokedex.length===0){
    return pokemon
  }

  const identityPokedex = R.map(({nationalPokedexNumber})=>nationalPokedexNumber)(pokedex)
  const filterList = R.filter(({nationalPokedexNumber})=>!R.contains(nationalPokedexNumber,identityPokedex),pokemon)
    if(search){
      return R.filter(
      ({name})=>R.indexOf(name,search)>0,
      )(filterList)
    }
    return filterList
  }
)