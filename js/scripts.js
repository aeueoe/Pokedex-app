let pokemonList = [
  { name: "Paras", type: ["bug, grass"], height: "0.3" },
  { name: "Vileplume", type: ["grass, poison"], height: "1.2" },
  { name: "Poliwag", type: ["water"], height: "0.6" },
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write(
    pokemonList[i].name + " (height: " + pokemonList[i].height + ") "
  );
  if (pokemonList[i].height <= 1.0) {
    document.write("<br>");
  } else {
    document.write("- Wow, that's big!");
    document.write("<br>");
  }
}