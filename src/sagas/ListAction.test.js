import { put, call } from "redux-saga/effects";
import { fetchList , watchFetchList} from "./ListAction";
import getPokemonList from "../services/getPokemonList";

describe("List fetching flow", () => {
  it("Fetches the List successfully", () => {
    const generator = fetchList();
    expect(generator.next().value).toEqual(
      put({ type: "LIST_LOADING", payload: true })
    );
    expect(generator.next().value).toEqual(call(getPokemonList));
    expect(generator.next().value).toEqual(
      put({ type: "LIST_LOADING", payload: false })
    );
    expect(generator.next().value).toEqual(put({ type: "GET_LIST_SUCCESS" }));
  });
  it("Fetches the List Fail", () => {
    const generator = fetchList();
    expect(generator.next().value).toEqual(
      put({ type: "LIST_LOADING", payload: true })
    );
    expect(generator.next().value).toEqual(call(getPokemonList));
    expect(generator.throw("error").value).toEqual(
      put({ type: "LIST_LOADING", payload: false })
    );
    expect(generator.next().value).toEqual(put({ type: "GET_LIST_FAIL" }));
  });
  it("call watchFetchList()", () => {
    
    expect(watchFetchList().next().value.type).toEqual('FORK');
  });
});
