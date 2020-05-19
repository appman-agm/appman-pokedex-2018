import { LOAD_CARD_INFO_SUCCESS } from '../constants/pockket-const'


const initialState = {
     cardInfo: {}
}


export const reducer = (state = initialState, action) => {

switch(action.type){

case LOAD_CARD_INFO_SUCCESS : 
return { ...state , cardInfo: action.payload.cardInfo}
default: return state
}

}