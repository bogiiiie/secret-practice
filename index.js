// This file runs in GitHub Actions AND in the browser
// In GitHub Actions, process.env.POKEMON_NAME exists
// In browser, we need to get the value from the HTML or API

async function loadPokemon() {
    const pokemonName = document.body.dataset.pokemonName;
    
    if (!pokemonName) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').textContent = 'No Pokemon name found. Run GitHub Actions first!';
        return;
    }
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
            throw new Error(`Pokemon "${pokemonName}" not found`);
        }
        
        const pokemon = await response.json();
        
        // Display the Pokemon data
        document.getElementById('pokemonImage').src = pokemon.sprites.other['official-artwork'].front_default;
        document.getElementById('pokemonName').textContent = pokemon.name.toUpperCase();
        document.getElementById('height').textContent = pokemon.height / 10;
        document.getElementById('weight').textContent = pokemon.weight / 10;
        document.getElementById('id').textContent = pokemon.id;
        document.getElementById('baseXp').textContent = pokemon.base_experience;
        document.getElementById('abilities').textContent = pokemon.abilities.map(a => a.ability.name).join(', ');
        document.getElementById('types').textContent = pokemon.types.map(t => t.type.name).join(', ');
        
        // Show content, hide loading
        document.getElementById('loading').style.display = 'none';
        document.getElementById('pokemonContent').style.display = 'block';
        
    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
        document.getElementById('error').textContent = `Error: ${error.message}`;
    }
}

// Start loading when page loads
loadPokemon();