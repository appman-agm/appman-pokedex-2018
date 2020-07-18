import { put, call,takeLatest  } from "redux-saga/effects";
import {
  getPokemonList,
  getPokemonListFail,
  loadingList,
} from "../actions/ActionType";
import getList from "../services/getPokemonList";
export function* fetchList() {
  yield put(loadingList(true));
  try {
    const list = yield call(getList);
    yield put(loadingList(false));
    yield put(getPokemonList(list));
  } catch (error) {
    yield put(loadingList(false));
    yield put(getPokemonListFail());
  }
}

export function* watchFetchList() {
  yield takeLatest("LIST_FETCH_REQUESTED", fetchList);
}

export default watchFetchList;
