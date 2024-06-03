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

  function findByName(name) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase() === name.toLowerCase();
    });
  }

  return {
    getAll: getAll,
    add: add,
    findByName: findByName,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(
    `<p>Name: ${pokemon.name}, Type: ${pokemon.type.join(", ")}, Height: ${
      pokemon.height
    } m`
  );
  if (pokemon.height >= 1) {
    document.write(" - Wow, that's big!");
  }
  document.write("</p>");
});
