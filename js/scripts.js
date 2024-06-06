let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=200";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");

    // Create a button for the pokemon
    let button = document.createElement("button");
    button.innerHTML = pokemon.name;
    button.classList.add("button-class");

    // Add an event listener
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
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
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    findByName: findByName,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
