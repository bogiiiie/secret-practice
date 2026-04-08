const fs = require('fs');
const POKEMON_NAME = process.env.POKEMON_NAME;

console.log(`🔑 Injecting Pokemon name from secret: ${POKEMON_NAME}`);

// Read the HTML file
let html = fs.readFileSync('index.html', 'utf8');

// Add the secret as a data attribute to body tag
// This replaces <body> with <body data-pokemon-name="pikachu">
html = html.replace('<body>', `<body data-pokemon-name="${POKEMON_NAME}">`);

// Save the modified HTML
fs.writeFileSync('index.html', html);
console.log('✅ Secret injected into index.html');