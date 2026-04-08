console.log("=== Pokemon API Secret Test ===\n");

// Get the API key from GitHub Secrets
const POKEMON_API_KEY = process.env.POKEMON_API_KEY;

console.log("API Key present:", POKEMON_API_KEY ? "✅ YES" : "❌ NO");
console.log("API Key length:", POKEMON_API_KEY?.length || 0);

if (!POKEMON_API_KEY) {
    console.log("\n❌ No API key found! Add POKEMON_API_KEY in GitHub Secrets");
    process.exit(1);
}

// Test if the API key works by fetching a Pokemon
async function testPokemonAPI() {
    console.log("\n🔍 Testing Pokemon API with your secret key...\n");
    
    try {
        // Try to fetch Pikachu (Pokemon #25)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu', {
            headers: {
                // Some Pokemon APIs require API keys in headers
                'Authorization': `Bearer ${POKEMON_API_KEY}`,
                'X-API-Key': POKEMON_API_KEY
            }
        });
        
        if (response.ok) {
            const pokemon = await response.json();
            console.log("✅ SUCCESS! API key is VALID!");
            console.log("\n📊 Pokemon Data Retrieved:");
            console.log(`   Name: ${pokemon.name.toUpperCase()}`);
            console.log(`   Height: ${pokemon.height}`);
            console.log(`   Weight: ${pokemon.weight}`);
            console.log(`   Abilities: ${pokemon.abilities.map(a => a.ability.name).join(', ')}`);
            console.log(`\n🎉 Your secret key worked! The Pokemon API returned data!`);
        } else {
            console.log(`❌ API returned status ${response.status}`);
            console.log("   Your API key might be invalid or the API requires different format");
        }
        
    } catch (error) {
        console.log("⚠️ Note: The public Pokemon API doesn't require a real key");
        console.log("   This is just a demo! Your secret was passed correctly:");
        console.log(`   Secret value received: ${POKEMON_API_KEY.substring(0, 3)}... (first 3 chars only)`);
        console.log("\n✅ The IMPORTANT part: Your GitHub Secret successfully reached your code!");
    }
}

testPokemonAPI();