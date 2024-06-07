let pokemonRepository = (function () {
  let pokemonList = [];
  // URL to fetch the list of Pokémon
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=200";

  // Get the modal container from the DOM
  let modalContainer = document.querySelector("#modal-container");

  // Function to format the weight
  function formatWeight(weight) {
    return `${parseInt(weight, 10) / 10} kg`;
  }

  // Function to format the height
  function formatHeight(height) {
    return `${parseInt(height, 10) / 10} m`;
  }

  // Function to format types
  function formatTypes(types) {
    return types.map((typeInfo) => typeInfo.type.name).join(", ");
  }

  // Function to display the modal with Pokémon details
  function showModal(pokemon) {
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Create the close button for the modal
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerHTML = "X";
    closeButtonElement.addEventListener("click", hideModal);

    // Create an element to display the Pokémon's name
    let titleElement = document.createElement("h1");
    titleElement.innerText = pokemon.name;

    // Create an image element to display the Pokémon's image
    let imageElement = document.createElement("img");
    imageElement.src = pokemon.imageUrl;
    imageElement.alt = `Image of ${pokemon.name}`;
    imageElement.classList.add("modal-img");

    // Create a paragraph to display the Pokémon's height
    let pokemonHeight = document.createElement("p");
    pokemonHeight.innerText = `Height: ${formatHeight(pokemon.height)}`;

    // Create a paragraph to display the Pokémon's weight
    let pokemonWeight = document.createElement("p");
    pokemonWeight.innerText = `Weight: ${formatWeight(pokemon.weight)}`;

    // Create a paragraph to display the Pokémon's types
    let pokemonTypes = document.createElement("p");
    pokemonTypes.innerText = `Types: ${formatTypes(pokemon.types)}`;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonWeight);
    modal.appendChild(pokemonTypes);

    modalContainer.appendChild(modal);

    // Make the modal container visible
    modalContainer.classList.add("is-visible");
  }

  // Function to hide the modal
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      hideModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  // Function to get all Pokémon in the list
  function getAll() {
    return pokemonList;
  }

  // Function to add a Pokémon to the list
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  // Function to create a list item for each Pokémon
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");

    // Create a button for the Pokémon
    let button = document.createElement("button");
    button.innerHTML = pokemon.name;
    button.classList.add("button-class");

    // Add an event listener to the button to show Pokémon details
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    // Append the button to the list item and the list item to the list
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  // Function to load the list of Pokémon from the API
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
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Functionto load details of a specific Pokémon from the API
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function to show details of a Pokémon in the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Function to find a Pokémon by name
  function findByName(name) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase() === name.toLowerCase();
    });
  }

  // Return the functions to be accessible outside the IIFE
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

// Load the list of Pokémon and display them
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
