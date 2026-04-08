async function testApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value.toLowerCase().trim();
    
    document.getElementById('currentKey').textContent = apiKey || '???';
    
    if (!apiKey) {
        showError('❌ Please enter an API Key (Pokemon name)!');
        return;
    }
    
    document.getElementById('pokemonCard').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`Invalid API Key: "${apiKey}" is not a valid Pokemon`);
        }
        
        const pokemon = await response.json();
        
        showSuccess(`✅ API Key "${apiKey}" is VALID! Access granted!`);
        displayPokemon(pokemon, apiKey);
        
    } catch (error) {
        showError(`❌ API Key "${apiKey}" is INVALID! Try: pikachu, charizard, mewtwo`);
    }
}

function displayPokemon(pokemon, apiKey) {
    document.getElementById('pokemonImage').src = pokemon.sprites.other['official-artwork'].front_default;
    document.getElementById('pokemonNameDisplay').textContent = pokemon.name.toUpperCase();
    
    const details = `
        <div style="margin-top: 20px;">
            <p>📏 Height: ${pokemon.height / 10}m</p>
            <p>⚖️ Weight: ${pokemon.weight / 10}kg</p>
            <p>🔢 ID: #${pokemon.id}</p>
            <p>🎯 Abilities: ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
    `;
    
    document.getElementById('pokemonData').innerHTML = details;
    document.getElementById('pokemonCard').style.display = 'block';
}

function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

document.getElementById('apiKeyInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        testApiKey();
    }
});

console.log("API Key Tester Ready! Your 'API Key' is the Pokemon name!");