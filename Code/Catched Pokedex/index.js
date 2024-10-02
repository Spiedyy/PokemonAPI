let catchedpokemons = localStorage.getItem('Pokemons');
catchedpokemons = JSON.parse(catchedpokemons);
const filterclone = document.getElementById("filter");


document.getElementById("Catch").addEventListener("click", () => {
    window.location.href = "../Catch Pokemon/index.html";
});

const template = document.getElementById('template');

function addPokemonCardWithDelay(index) {
    if (index < catchedpokemons.length) {
        const template = document.getElementById('template');
        const pokemonTemplate = document.getElementById('pokemoncard');

        const pokemoncard = pokemonTemplate.cloneNode(true);
        const seemore = pokemoncard.querySelector('#morebtn');
        seemore.id = `morebtn_${index}`;
        pokemoncard.id = `pokemoncard_${index}`;
        pokemoncard.classList.remove('hidden');
        pokemoncard.dataset.types = catchedpokemons[index].types.map(type => type.type.name).join(',');
        pokemoncard.querySelector('img').src = catchedpokemons[index].sprites.front_default;
        pokemoncard.querySelector('h2').innerHTML = catchedpokemons[index].name;
        pokemoncard.querySelector('#hpstat').innerHTML = catchedpokemons[index].stats[0].base_stat;
        pokemoncard.querySelector('#attackstat').innerHTML = catchedpokemons[index].stats[1].base_stat;
        template.appendChild(pokemoncard);

        setTimeout(() => {
            pokemoncard.classList.add('pin');
            stylePokemonCards();
        }, 500 + 100 * index);

        addPokemonCardWithDelay(index + 1);

        if (index === catchedpokemons.length - 1) {
            pokemonTemplate.remove();
        }
    }
}

setTimeout(() => {
    const seemoreButtons = document.querySelectorAll('[id^="morebtn"]');

    seemoreButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            console.log(catchedpokemons[index]);
        });
    });
}, 500 + 100 * catchedpokemons.length);


function stylePokemonCards() {
    const totalCards = catchedpokemons.length;

    for (let i = 0; i < totalCards; i++) {
        const cardId = `#pokemoncard_${i}`;
        const card = document.querySelector(cardId);

        if (card) {
            const types = Array.from(card.dataset.types.split(','));

            if (types.length === 1) {
                card.classList.add(`bg-${getColorForType(types[0])}`);
            } else {
                card.classList.add(
                    'bg-gradient-to-b',
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

createFilter();

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

filterPokemonCards();

function getColorForType(type) {
    const typeToColor = {
        grass: 'green-400',
        fire: 'red-500',
        water: 'blue-500',
        poison: 'purple-500',
        bug: 'yellow-300',
        electric: 'yellow-400',
        ground: 'yellow-600',
        ice: 'blue-300',
        fairy: 'pink-300',
        normal: 'gray-300',
        steel: 'gray-500',
        flying: 'indigo-300',
        fighting: 'indigo-200',
        psychic: 'red-400',
        ghost: 'gray-300',
        dragon: 'indigo-500',
        rock: 'yellow-700',
        dark: 'gray-800',
    };

    return typeToColor[type] || 'bg-gray-300';
}

addPokemonCardWithDelay(0);
