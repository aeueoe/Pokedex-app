let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Paras", type: ["bug", "grass"], height: "0.3" },
    { name: "Vileplume", type: ["grass", "poison"], height: "1.2" },
    { name: "Poliwag", type: ["water"], height: "0.6" },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");

    // Create a button for the pokemon
    let button = document.createElement("button");
    button.innerHTML = pokemon.name;
    button.classList.add("button-class");

    // Add an event listener
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  function showDetails(pokemon) {
    console.log("Details for: " + pokemon.name);
  }

  // Function to find a pokemon by name
  function findByName(name) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase() === name.toLowerCase();
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    findByName: findByName,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
