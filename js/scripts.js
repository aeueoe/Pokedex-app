let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=200";

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Function to format the weight
  function formatWeight(weight) {
    return `${parseInt(weight, 10) / 10} kg`;
  }

  // Function to format the height
  function formatHeight(height) {
    return `${parseInt(height, 10) / 10} m`;
  }

  // Function to format the types
  function formatTypes(types) {
    return types
      .map((typeInfo) => capitalizeFirstLetter(typeInfo.type.name))
      .join(", ");
  }

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemon.name = capitalizeFirstLetter(pokemon.name);
      pokemonList.push(pokemon);
    } else {
      console.log("Not Found");
    }
  }
  // Show the details of a Pokémon in the modal

  function showModal(pokemon) {
    let modalImage = document.querySelector(".modal-image");
    let modalTitle = document.querySelector(".modal-title");
    let modalHeight = document.querySelector(".modal-height");
    let modalWeight = document.querySelector(".modal-weight");
    let modalTypes = document.querySelector(".modal-types");

     modalImage.src = pokemon.imageUrl;
    modalImage.alt = `Image of ${pokemon.name}`;
    modalTitle.innerText = pokemon.name;
    modalHeight.innerHTML = `Height: <span class="bold">${formatHeight(
      pokemon.height
    )}</span>`;
    modalWeight.innerHTML = `Weight: <span class="bold">${formatWeight(
      pokemon.weight
    )}</span>`;
    modalTypes.innerHTML = `Types: <span class="bold">${formatTypes(
      pokemon.types
    )}</span>`;

    const pokemonModal = document.getElementById("pokemonModal");
    pokemonModal.classList.add("show");
  }

  function getAll() {
    return pokemonList;
  }

  // Add a list item for a Pokémon list
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    // Create a button element for the Pokémon's name
    let button = document.createElement("button");
    button.type = "button";
    button.innerHTML = pokemon.name;
    button.classList.add("btn");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#pokemonModal");

    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  // Load the Pokémon list from the API
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

  // Load the details of a Pokémon from the API
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

  // Show the details of a Pokémon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Search for Pokémon by name
  function searchPokemon(query) {
    let filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    renderList(filteredList);
  }

  function renderList(list) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    pokemonListElement.innerHTML = "";
    list.forEach((pokemon) => addListItem(pokemon));
  }

  document
    .querySelector("#pokemon-search")
    .addEventListener("input", function (e) {
      let query = e.target.value;
      searchPokemon(query);
    });

  // Back to top button
  let backToTopButton = document.getElementById("btn-back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    showDetails: showDetails,
    showModal: showModal,
    renderList: renderList,
    searchPokemon: searchPokemon,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
