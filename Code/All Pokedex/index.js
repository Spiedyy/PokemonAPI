let pokemondata;
const template = document.getElementById("template");
const pokemonTemplate = document.getElementById("pokemoncard");
const filterclone = document.getElementById("filter");
const filtertemplate = document.getElementById("filtertemplate");

async function fetchPokemonById(pokemonId) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const pokemonData = await response.json();
    return pokemonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function fetchAllPokemonFromRange(startId, endId) {
  try {
    const pokemonDataArray = [];
    for (let id = startId; id <= endId; id++) {
      const pokemon = await fetchPokemonById(id);
      pokemonDataArray.push(pokemon);
    }
    return pokemonDataArray;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    throw error;
  }
}

const startId = 1;
const maxCount = 100;
const endId = startId + maxCount - 1;

function createcard() {
  for (let i = 0; i < pokemondata.length; i++) {
    const pokemoncard = pokemonTemplate.cloneNode(true);
    pokemoncard.id = `pokemoncard_${i}`;
    pokemoncard.classList.remove("hidden");
    pokemoncard.dataset.types = pokemondata[i].types
      .map((type) => type.type.name)
      .join(",");
    pokemoncard.querySelector("h2").innerHTML = pokemondata[i].name;
    pokemoncard.querySelector("#hpstat").innerHTML =
      pokemondata[i].stats[0].base_stat;
    pokemoncard.querySelector("#attackstat").innerHTML =
      pokemondata[i].stats[1].base_stat;
    pokemoncard.querySelector("img").src = pokemondata[i].sprites.front_default;
    template.appendChild(pokemoncard);
  }
}

function stylePokemonCards() {
  const totalCards = pokemondata.length;

  for (let i = 0; i < totalCards; i++) {
    const cardId = `#pokemoncard_${i}`;
    const card = document.querySelector(cardId);

    if (card) {
      const types = Array.from(card.dataset.types.split(","));

      if (types.length === 1) {
        card.classList.add(`bg-${getColorForType(types[0])}`);
      } else {
        card.classList.add(
          "bg-gradient-to-b",
          `from-${getColorForType(types[0])}`,
          `to-${getColorForType(types[1])}`
        );
      }
    } else {
      console.error(`Card with ID ${cardId} not found.`);
    }
  }
}

const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

function createFilter() {
  for (let i = 0; i < pokemonTypes.length; i++) {
    const filter = filterclone.cloneNode(true);
    filter.id = `filter_${i}`;
    filter.classList.remove("hidden");
    filter.querySelector("label").innerHTML = pokemonTypes[i];
    filter.querySelector("input").value = pokemonTypes[i];
    filtertemplate.appendChild(filter);
  }
}

function getColorForType(type) {
  const typeToColor = {
    grass: "green-400",
    fire: "red-500",
    water: "blue-500",
    poison: "purple-500",
    bug: "yellow-300",
    electric: "yellow-400",
    ground: "yellow-600",
    ice: "blue-300",
    fairy: "pink-300",
    normal: "gray-300",
    steel: "gray-500",
    flying: "indigo-300",
    fighting: "indigo-200",
    psychic: "red-400",
    ghost: "gray-300",
    dragon: "indigo-500",
    rock: "yellow-700",
    dark: "gray-800",
  };

  return typeToColor[type] || "bg-gray-300";
}

function filterPokemonCards() {
  const filterType = document.querySelectorAll("input[type='checkbox']");

  filterType.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const checkedTypes = Array.from(filterType)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);

      const pokemonCards = document.querySelectorAll("[id^='pokemoncard']");

      pokemonCards.forEach((card, index) => {
        if (index !== 0) {
          const cardTypes = card.dataset.types;

          if (cardTypes !== undefined && cardTypes !== null) {
            const typesArray = cardTypes.split(",");
            const cardId = card.id;

            if (
              !typesArray.some((type) => checkedTypes.includes(type)) &&
              checkedTypes.length > 0
            ) {
              card.classList.add("hidden");
            } else {
              card.classList.remove("hidden");
            }
          }
        }
      });
    });
  });
}

fetchAllPokemonFromRange(startId, endId)
  .then((pokemonDataArray) => {
    pokemondata = pokemonDataArray
    createcard();
    stylePokemonCards();
    createFilter();
    filterPokemonCards();
  })
  .catch((error) => {
    console.error("Error:", error);
  });
