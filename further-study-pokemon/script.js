const pokemonContainer = document.getElementById('pokemon-container');
const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', () => {
    getRandomPokemonIds(3)
        .then(randomPokemonIds => Promise.all(randomPokemonIds.map(id => getPokemonData(id))))
        .then(pokemonData => displayPokemon(pokemonData))
        .catch(error => console.error('Error:', error));
});

function getRandomPokemonIds(count) {
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000')
        .then(response => response.json())
        .then(data => {
            const pokemonIds = [];
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const pokemonId = data.results[randomIndex].url.split('/').slice(-2, -1)[0];
                pokemonIds.push(pokemonId);
            }
            return pokemonIds;
        });
}

function getPokemonData(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => ({
            name: data.name,
            sprite: data.sprites.front_default,
            speciesUrl: data.species.url
        }));
}

function getPokemonDescription(speciesUrl) {
    return fetch(speciesUrl)
        .then(response => response.json())
        .then(data => {
            const flavorTextEntries = data.flavor_text_entries.filter(entry => entry.language.name === 'en');
            if (flavorTextEntries.length > 0) {
                return flavorTextEntries[0].flavor_text;
            } else {
                return 'Description not available.';
            }
        });
}

function displayPokemon(pokemonData) {
    pokemonContainer.innerHTML = '';
    pokemonData.forEach(pokemon => {
        getPokemonDescription(pokemon.speciesUrl)
            .then(description => {
                const pokemonElement = document.createElement('div');
                pokemonElement.classList.add('pokemon');
                pokemonElement.innerHTML = `
                    <img src="${pokemon.sprite}" alt="${pokemon.name}">
                    <h2>${pokemon.name}</h2>
                    <p>${description}</p>
                `;
                pokemonContainer.appendChild(pokemonElement);
            })
            .catch(error => console.error('Error:', error));
    });
}
