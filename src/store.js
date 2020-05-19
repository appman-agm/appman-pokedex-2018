import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

// Note: this API requires redux@>=3.1.0




export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));