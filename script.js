const types = document.querySelectorAll("#types");
const type_filter_btn = document.querySelector(".type-filter-btn");
const reset_btn = document.querySelector(".reset-btn");
const cards_container = document.querySelector(".cards-container");
const search = document.querySelector("#search");

async function displayCards() {
  // Assuming types is a single <select> element
  let type_text = types.selected; // Select the first <select> element
  const url = `https://pokeapi.co/api/v2/type/`; // Use the selected text in the URL

  const res = await fetch(url);
  const data = await res.json();
  const type = data.results.filter((type) => type.name === type_text);
  console.log(type);
  // type = data.name.filter((item) => {
  //   return item === types.value; // Check if there's a pokemon name for each item in the result
  // });

  // console.log(type);

  type.forEach((val) => {
    const pokemon_type = val.name;
    const img_src = val.url;
    const pokemon_name = val.name;

    let div = document.createElement("div");

    div.className = "card";
    document.querySelector(".card");
    div.innerHTML = div.className = "card";
    div.innerHTML = `
      <div class="card_no"></div>
      <div class="pokemon_img"><img src="${img_src}" alt="" /></div>
      <div class="pokemon_name">${pokemon_name}</div>
      <div class="pokemon_type">${pokemon_type}</div>
    `;

    cards_container.appendChild(div);
  });
}

type_filter_btn.addEventListener("click", displayCards());

reset_btn.addEventListener("click", () => {
  types.forEach((type) => (type.checked = false));
  displayCards();
});

// search.addEventListener("keyup", displayCards());
