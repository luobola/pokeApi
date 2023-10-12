
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon
}

pokeApi.getPokemonsDetail= (pokemon) =>{
    return fetch(pokemon.url)
            .then((response)=> response.json())
            .then(convertPokeApiDetailToPokemon)
}

//chamada da API
pokeApi.getPokemons = (offset = 0, limit = 5) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` //não é aspas, é acento crase***
    return fetch(url)
            .then((response) => response.json()) // transforma o body em JSON
            .then((jsonBody) => jsonBody.results)//pega a lista de pokemons
            .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
            .then((detailRequest) => Promise.all(detailRequest))
            .then((pokemonsDetails) => pokemonsDetails)
            
}