import { 
     LOAD_CARD_INFO_SUCCESS,
     ADD_CARD,
 } from '../constants/list-pockket-const'


const initialState = {
     cardInfo: {},
     addCard: false,
}


export const reducer = (state = initialState, action) => {

switch(action.type){

case LOAD_CARD_INFO_SUCCESS: 
return { ...state , cardInfo: action.payload.cardInfo}
case ADD_CARD:
     return { ...state , addCard: true}
default: return state
}

}