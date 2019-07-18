
import { SET_POKE_MON } from "../actions";

export default (state=[],{type,payload})=>{
  switch(type){
    case
      SET_POKE_MON:
      return payload
    default:
      return state
  }
}