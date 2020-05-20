import { MyPoketReducer } from './modules/my-pocket/reducers'
import { ListPoketReducer } from './modules/list-pocket/reducers'

import { combineReducers } from 'redux'


export default combineReducers({ 
    myPocket: MyPoketReducer,
    listPocket: ListPoketReducer
})



