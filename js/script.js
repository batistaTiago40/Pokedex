const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonData = document.querySelector('.pokemon__data');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const search = document.querySelector('.search');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonNumber.innerHTML = '';
  pokemonName.innerHTML = 'Loading...';
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;

    data.name.toString();

    var tamanho = data.name.toString().length + data.id.toString().length;
    if (tamanho > 17) {
      pokemonData.style.fontSize = 'clamp(6px, 4vw, 20px)';
    } else {
      pokemonData.style.fontSize = 'clamp(8px, 5vw, 25px)';
    } // Pokemons com nomes grandes não quebram mais o layout

    pokemonNumber.innerHTML = data.id;

    if (data.id >= 650) {
      pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
      pokemonImage.style.height = '35%';
      pokemonImage.style.left = '55%';
      pokemonImage.style.bottom = '57%';
    } else {
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      pokemonImage.style.height = '18%';
      pokemonImage.style.left = '50%';
      pokemonImage.style.bottom = '55%';
      pokemonImage.style.transform = 'translate(-63%, 20%)';
      pokemonImage.style.position = 'absolute';
    } // Pokemons sem fotos animadas 
    

    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonName.innerHTML = 'Not Found :c';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
  }
}

form.addEventListener('submit', (event) => {

  event.preventDefault();

  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
})

buttonNext.addEventListener('click', () => {
  searchPokemon++;
  renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);