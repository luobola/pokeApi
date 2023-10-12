const pokemonList = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')
const limit = 10
let offset = 0;
const maxRecords = 151


//Manipulação do html para listar os pokemons.
function loadPoke(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" >   
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class= "type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">  
                </div>
        </li>`).join('')
    })
}

loadPoke(offset, limit)
loadMore.addEventListener('click', ()=> {
    offset += limit
    const qtdRecordNextPage = offset + limit
    if (qtdRecordNextPage >= maxRecords ){
        const newLimit = maxRecords - offset
        loadPoke(offset,newLimit)

        loadMore.parentElement.removeChild(loadMore)
    }else{
        loadPoke(offset, limit)
    }
})