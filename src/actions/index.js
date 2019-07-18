import axios from 'axios'
export const SET_POKE_MON  = 'SET_POKE_MON'
export const SET_POKEDEX  = 'SET_POKEDEX'
export const REMOVE_POKEDEX  = 'REMOVE_POKEDEX'
export const OPEN_MODAL  = 'OPEN_MODAL'
export const CLOSE_MODAL  = 'CLOSE_MODAL'

export const fetchPokemon = ()=>{
  return  async dispatch=>{
    const {data:{cards}} = await axios.get('http://localhost:3030/api/cards')
    dispatch({
      type:SET_POKE_MON,
      payload:cards
    })
  }
}

export const addPokedex = (value)=>{
    return dispatch=>{
      dispatch({
        type:SET_POKEDEX,
        payload:value
      })
    }
}

export const removePokedex = (value)=>{
  return dispatch=>{
    dispatch({
      type:REMOVE_POKEDEX,
      payload:value
    })
  }
}

export const OpenModal =()=>{
  return dispatch=>{
    dispatch({
      type:OPEN_MODAL,
    })
  }
}
export const CloseModal =()=>{
  return dispatch=>{
    dispatch({
      type:CLOSE_MODAL,
    })
  }
}

export const searchPokemon = (v)=>{
  return dispatch=>{
    dispatch({
      type:'SET_SEARCH',
      payload:v
    })
  }
}