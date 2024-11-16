const types = document.querySelector("#types");
const type_filter_btn = document.querySelector(".type-filter-btn");
const reset_btn = document.querySelector(".reset-btn");
const cards_container = document.querySelector(".cards-container");
const search = document.querySelector("#search_box");

async function displayCards() {
  // Clear previous cards
  cards_container.innerHTML = "";

  // Get the selected type from the dropdown
  let type_text = types.value.toLowerCase();

  const url = `https://pokeapi.co/api/v2/type/${type_text}`;
  const res = await fetch(url);
  const data = await res.json();

  // Extract Pokémon array based on the selected type
  const type = data.pokemon.map((ele) => ele.pokemon);

  // Display each Pokémon
  type.forEach((val) => {
    const pokemon_name = val.name;
    const img_src = `https://img.pokemondb.net/artwork/large/${pokemon_name}.jpg`; // Example image URL

    let div = document.createElement("div");
    div.className = "card";
    div.style.backgroundColor = random_bg_color();
    div.innerHTML = `
      <div class="card_no"></div>
      <div class="pokemon_img"><img src="${img_src}" alt="${pokemon_name}" style="width:50px; height:50px" /></div>
      <div class="pokemon_name">${pokemon_name.toUpperCase()}</div>
      <div class="pokemon_type">${type_text.toUpperCase()}</div>
    `;

    cards_container.appendChild(div);
  });
}

// Event listeners
type_filter_btn.addEventListener("click", displayCards);

reset_btn.addEventListener("click", () => {
  types.selectedIndex = 0; // Reset dropdown selection
  cards_container.innerHTML = ""; // Clear displayed cards
});

// Uncomment and implement search functionality if needed
// search.addEventListener("keyup", displayCards);

// Define a function named random_bg_color that generates a random RGB color and sets it as the background color of the document body.
function random_bg_color() {
  // Generate random values for red, green, and blue components between 0 and 255.
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);

  var bgColor = "rgb(" + x + "," + y + "," + z + ")";

  return bgColor;
}

random_bg_color();

async function displayCardsAll() {
  cards_container.innerHTML = ""; // Clear existing cards

  let type_text = types.value.toLowerCase();

  if (type_text === "" || type_text === "all types") {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=100`; // Adjust limit as needed
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    // Display each Pokémon
    data.results.forEach((val) => {
      const pokemon_name = val.name;
      const img_src = `https://img.pokemondb.net/artwork/large/${pokemon_name}.jpg`; // Example image URL

      let div = document.createElement("div");
      div.className = "card";
      div.style.backgroundColor = random_bg_color();
      div.innerHTML = `
        <div class="card_no"></div>
        <div class="pokemon_img"><img src="${img_src}" alt="${pokemon_name}" style="width:50px; height:50px" /></div>
        <div class="pokemon_name">${pokemon_name.toUpperCase()}</div>

      `;

      cards_container.appendChild(div);
    });
  }
}

// Event listener to load all Pokémon on page load
window.addEventListener("load", displayCardsAll);

async function displayCardsSearch() {
  // Clear previous cards
  cards_container.innerHTML = "";

  // Get the search input value
  const str = search.value.toLowerCase(); // Use `value` instead of `textContent` for input fields

  const url = `https://pokeapi.co/api/v2/pokemon?limit=100`; // Fetching a specific number of Pokémon
  const res = await fetch(url);
  const data = await res.json();

  // Filter Pokémon by name matching the search query
  const filteredPokemon = data.results.filter((pokemon) =>
    pokemon.name.includes(str)
  );

  // Display each filtered Pokémon
  filteredPokemon.forEach((pokemon) => {
    const pokemon_name = pokemon.name;
    const img_src = `https://img.pokemondb.net/artwork/large/${pokemon_name}.jpg`; // Example image URL

    let div = document.createElement("div");
    div.className = "card";
    div.style.backgroundColor = random_bg_color();
    div.innerHTML = `
      <div class="card_no"></div>
      <div class="pokemon_img"><img src="${img_src}" alt="${pokemon_name}" style="width:50px; height:50px" /></div>
      <div class="pokemon_name">${pokemon_name.toUpperCase()}</div>
     
    `;

    cards_container.appendChild(div);
  });
}

// Event listener to search on keyup
search.addEventListener("keyup", displayCardsSearch); // Pass the function reference, not a function call
