import { MyPoketReducer } from './modules/my-pocket/reducers'
import { combineReducers } from 'redux'


export default combineReducers({ 
    myPocket: MyPoketReducer
})



