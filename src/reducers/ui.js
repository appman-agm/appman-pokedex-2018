import { OPEN_MODAL, CLOSE_MODAL } from "../actions";

const initialState ={
  isOpen:false,
}

export default (state=initialState,{type,payload})=>{
  switch(type){
  case
  CLOSE_MODAL:
   return {...state,isOpen:false}
   case
   OPEN_MODAL:
    return {...state,isOpen:true}
  default:
    return {...state}
  }
}