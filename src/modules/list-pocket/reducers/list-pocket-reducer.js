import { 
     LOAD_CARD_INFO_SUCCESS,
     ADD_CARD,
     DELETE_CARD
 } from '../constants/list-pockket-const'




const initialState = {
     cardInfo: {},
     addCard: false,
     cards: [],
     idsAdd: [],
     idsDelete: [],
}


export const reducer = (state = initialState, action) => {

switch(action.type){

case LOAD_CARD_INFO_SUCCESS: 
return { ...state , cardInfo: { cards: action.payload.cardInfo.cards.map(card => {
     return {...card, selectCard: false}
})}}
case ADD_CARD:
     const  dataInfoAdd =  action.payload.cardAddFlag
     const idsAdd = state.idsAdd.concat(action.payload.id)
     return { ...state , idsAdd: idsAdd  , cardInfo: { cards: dataInfoAdd.map(card => {
          if( idsAdd.includes(card.id)) {
               return {...card, selectCard: true}
          } else {
               return {...card, selectCard: false}
          }
     })  }}
case DELETE_CARD:
     const  dataInfoDelete =  action.payload.deleteMyPocket
     const idsDelete = state.idsDelete.concat(action.payload.id)
     
     return { ...state , idsDelete: idsDelete  , cardInfo: { cards: dataInfoDelete.map(card => {
          if(idsDelete.includes(card.id)) {
               return {...card, selectCard: false}
          } else {
               return {...card,}
          }
     })  }}
default: return state
}
}