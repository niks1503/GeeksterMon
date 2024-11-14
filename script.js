// const types = document.querySelector("#types");
// const type_filter_btn = document.querySelector(".type-filter-btn");
// const reset_btn = document.querySelector(".reset-btn");
// const cards_container = document.querySelector(".cards-container");
// const search = document.querySelector("#search");

// async function displayCards() {
//   // Assuming types is a single <select> element
//   let type_text = types.value.toLowerCase(); // Select the first <select> element

//   const url = `https://pokeapi.co/api/v2/type/${type_text}`; // Use the selected text in the URL

//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
//   const type = data.results.filter((ele) => ele["name"] === type_text);

//   // console.log(type);
//   type.forEach((val) => {
//     const pokemon_type = val.name;
//     const img_src = val.url;
//     const pokemon_name = val.name;

//     let div = document.createElement("div");

//     div.className = "card";
//     document.querySelector(".card");
//     div.innerHTML = div.className = "card";
//     div.innerHTML = `
//       <div class="card_no"></div>
//       <div class="pokemon_img"><img src="${img_src}" alt="" /></div>
//       <div class="pokemon_name">${pokemon_name}</div>
//       <div class="pokemon_type">${pokemon_type}</div>
//     `;

//     cards_container.appendChild(div);
//   });
// }

// type_filter_btn.addEventListener("click", displayCards());

// reset_btn.addEventListener("click", () => {
//   types.forEach((type) => (type.checked = false));
//   displayCards();
// });

// // search.addEventListener("keyup", displayCards());

const types = document.querySelector("#types");
const type_filter_btn = document.querySelector(".type-filter-btn");
const reset_btn = document.querySelector(".reset-btn");
const cards_container = document.querySelector(".cards-container");
const search = document.querySelector("#search");

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
  // Construct the RGB color string.
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  // Output the generated color to the console.
  // console.log(bgColor);
  // Set the background color of the document body to the generated color.
  //document.body.style.background = bgColor;
  return bgColor;
}

// Call the random_bg_color function to set a random background color.
random_bg_color();
