const getPokemonList = async () =>{
    const response = await fetch("http://localhost:3030/api/cards");
    const data = await response.json();
    
    return data.cards
}

export default getPokemonList;