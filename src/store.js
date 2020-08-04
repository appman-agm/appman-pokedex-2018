import RootReducer from "./reducers/index";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
import RootSaga from "./sagas/Rootsaga";
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
// const store = createStore(
//     RootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );
const sagaMiddleware = createSagaMiddleware();

// sagaMiddleware.run(ListAction);
const middlewares = [sagaMiddleware];
export const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(RootSaga);
