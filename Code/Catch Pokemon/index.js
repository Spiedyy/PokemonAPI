const catchpokemon = document.getElementById('Catch');
const pokemonPic = document.getElementById('pokemonpicture');
const catchInput = document.getElementById('catchtext');
const goodalert = document.getElementById('goodalert');
const goodtext = document.getElementById('goodtext');
const goodbtn = document.getElementById('goodbtn');
const badtext = document.getElementById('wrongtext');
const badbtn = document.getElementById('wrongbtn');
const badalert = document.getElementById('wrongalert');
let Pokename = document.getElementById('pokemonname');
const BattleSound = '../../Images+Audio/Battle Song.mp3';

let pokemoninfo;
let audio;
let pokemons = [];

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(1017));
}


function getPokemonsFromStorage() {
    const storedPokemons = localStorage.getItem('Pokemons');
    if (storedPokemons) {
        return JSON.parse(storedPokemons);
    } else {
        return [];
    }
}

function updateLocalStorage(pokemons) {
    localStorage.setItem('Pokemons', JSON.stringify(pokemons));
}

async function fetchData() {
    try {
        audio = new Audio(BattleSound);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomInt()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const pokemon = await response.json();
        pokemoninfo = pokemon;
        console.log(pokemoninfo.name);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

catchpokemon.addEventListener('click', () => {
    fetchData();
    setTimeout(() => {
        pokemonPic.classList.add('animation');
        audio.volume = 0.1;
        audio.play();
        catchpokemon.disabled = true;
        catchInput.classList.remove('hidden');
        catchInput.classList.add('fadein');
        pokemonPic.src = pokemoninfo.sprites.front_default;
        setTimeout(() => {
            pokemonPic.classList.remove('animation');
        }, 1000);
    }, 1000);
});

catchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (Pokename.value.toLowerCase() === pokemoninfo.name.toLowerCase()) {
            goodalert.classList.remove('hidden');
            goodalert.classList.add('fadein');
            goodtext.innerHTML = `You caught ${pokemoninfo.name}!`;
            pokemons = getPokemonsFromStorage();
            pokemons.push(pokemoninfo);
            updateLocalStorage(pokemons);
        } else {
            badalert.classList.remove('hidden');
            badalert.classList.add('fadein');
            badtext.innerHTML = `You failed to catch ${pokemoninfo.name}!`;
        }
        Pokename.value = '';
        pokemonPic.src = '';
        catchpokemon.disabled = false;
        catchInput.classList.add('hidden');
        audio.pause();
    }
});

function bad() {
    badalert.classList.add('fadeout');
    setTimeout(() => {
        badalert.classList.add('hidden');
        badalert.classList.remove('fadeout');
    }, 1000);
}

function good() {
    goodalert.classList.add('fadeout');
    setTimeout(() => {
        goodalert.classList.add('hidden');
        goodalert.classList.remove('fadeout');
    }, 1000);
}

badbtn.addEventListener('click', () => {
    bad();
});

goodbtn.addEventListener('click', () => {
    good();
});