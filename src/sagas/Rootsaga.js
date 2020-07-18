import {all } from "redux-saga/effects";
import {watchFetchList} from './ListAction'

export default function* rootSaga() {
  yield all([watchFetchList()]);
}
