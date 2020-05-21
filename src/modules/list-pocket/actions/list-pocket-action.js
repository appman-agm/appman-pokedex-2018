import {
    LOAD_CARD_INFO_SUCCESS,
    LOAD_CARD_INFO_FAIL,
    ADD_CARD,
    DELETE_CARD,
  } from '../constants/list-pockket-const'

  import { remoteMoteApi } from '../../../remote-api'

export const loadCardinfo = () => (dispatch, getState) => {
    return remoteMoteApi().get('/api/cards')
    .then((response) => dispatch(loadCardinfoSuccess(response.data)))
    .catch((e) => {
        dispatch(loadCardinfoFail(e))
    })
} 

export const loadCardinfoSuccess = (cardInfo) => ({
    type:LOAD_CARD_INFO_SUCCESS,
    payload: {
        cardInfo
    }
})

export const loadCardinfoFail = (error) => ({
    type:LOAD_CARD_INFO_FAIL,
    payload: {
        error
    }
})

export const addCardAction = (id, cardAddFlag ) => ({
    type:ADD_CARD,
    payload: {
        id,
        cardAddFlag,
    }
})

export const deleteCardAction = (id, deleteMyPocket ) => ({
    type: DELETE_CARD,
    payload: {
        id,
        deleteMyPocket
    }
})




