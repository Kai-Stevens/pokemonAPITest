const fetchPokemon = async (pokemonIndex) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
    const pokemonData = await response.json();
    console.log(pokemonData);
    
    //Change title, images and movelist
    changeTitle(pokemonData);
    changeImages(pokemonData);
    changeMoveList(pokemonData);

  } catch(error) {
    console.log(error);
  }
}

const changeTitle = (pokemonData) => {
  const pokemonTitle = document.querySelector("#pokemonName");
  pokemonTitle.textContent = pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1) + "Hello Friends";
}

const changeImages = (pokemonData) => {
  const pokemonImage = document.querySelector('#pokeImage');
  const pokemonImageBack = document.querySelector('#pokeImageBack');

  pokemonImage.src = pokemonData.sprites.front_default;
  pokemonImageBack.src = pokemonData.sprites.back_default;
}

const changeMoveList = (pokemonData) => {
  const moveList = document.querySelector('#list');
  moveList.innerHTML = "";

  for(let i = 0; i < 5; i++){
    // create a list item everytime we go through the loop
    let pokemonMove = document.createElement('li');
    // assign the textContent of each list item to the name of the move
    pokemonMove.textContent = pokemonData.moves[i].move.name;
    // append the list item to the list
    moveList.append(pokemonMove);
  }
}

const setupButton = () => {
  let index = 1;
  const pokemonButton = document.querySelector("#nextPokemon");
  pokemonButton.addEventListener('click', () => {
    index++;
    fetchPokemon(index);  
  });

}

const handleSubmit = (e) => {
  e.preventDefault();
  let form = document.querySelector("#pokemonForm");
  // get name
  let userPokemonName = e.target.userPokeName.value;
  fetchPokemon(userPokemonName);
  form.reset();
}

const setupForm = () => {
  const pokemonForm = document.querySelector("#pokemonForm");
  pokemonForm.addEventListener('submit', handleSubmit);
}

fetchPokemon(1);
setupForm();
setupButton();
