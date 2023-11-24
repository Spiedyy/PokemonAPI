# Pokémon Website

Welcome to our Pokémon website! This platform provides an interactive experience for Pokémon enthusiasts to catch, explore, and discover various Pokémon.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Code Overview](#code-overview)
- [API Information](#api-information)
- [Usage](#usage)

## Introduction

Our Pokémon website offers several functionalities, including a personal Pokédex, an overall Pokédex, and a page dedicated to catching Pokémon. Users can catch Pokémon by guessing their names and store them in their personal collection.

## Features

### Personal Pokédex

- **Catching Pokémon:** Users can attempt to catch Pokémon by typing in the correct name.
- **Storage:** Caught Pokémon are stored in the user's personal Pokédex using local storage.
- **Pokémon Cards:** Displays caught Pokémon with their respective stats and images in a visually appealing format.

### Overall Pokédex

- **Comprehensive Database:** Utilizes the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data.
- **Random Pokémon Generation:** Users can catch random Pokémon from the vast Pokémon universe.

## Code Overview

### Catching Pokémon

- JavaScript code allows users to interactively catch Pokémon by guessing their names.
- Utilizes `fetchData()` function to fetch data from the PokéAPI for random Pokémon.

### Overall Pokédex Page

- Fetches individual Pokémon data using `fetchPokemonData()` function from the PokéAPI.
- Creates Pokémon cards dynamically using `createPokemonCard()` function based on fetched information.
- Presents detailed information about a selected Pokémon in a modal using `openModal()` function.

## API Information

This website utilizes the [PokéAPI](https://pokeapi.co/) to gather information about Pokémon. The PokéAPI is a RESTful API that provides comprehensive Pokémon data, including details about Pokémon species, types, abilities, moves, and more.

### Features of the PokéAPI

- **Pokémon Data:** Accesses detailed information about various Pokémon species.
- **Type Information:** Retrieves data regarding Pokémon types and their attributes.
- **Abilities and Moves:** Provides information on Pokémon abilities and movesets.
- **Species Specifics:** Includes details about habitats, capture rates, and evolution chains for Pokémon species.

For more detailed information about the API, visit [PokéAPI Documentation](https://pokeapi.co/docs/v2).

## Usage

To use the Pokémon catching feature:
1. Click on the "Catch" button to initiate the catching process.
2. Guess the Pokémon's name in the input field and press Enter.
3. Successfully caught Pokémon will be added to your collection.

Feel free to explore other pages for additional functionalities!
