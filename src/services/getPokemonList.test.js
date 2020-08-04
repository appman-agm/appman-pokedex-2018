import getPokemonList from "../services/getPokemonList";

describe("getPokemonList function", () => {
  it("should return the card with 20 length", async () => {
    const data = await getPokemonList();
    const response = await fetch("http://localhost:3030/api/cards");
    const dataRes = await response.json();
    expect(data.length).toEqual(20);
    expect(data).toEqual(dataRes.cards);
  });
});
