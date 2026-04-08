const fs = require('fs');
const POKEMON_NAME = process.env.POKEMON_NAME;

console.log(`🔑 Injecting Pokemon name from secret: ${POKEMON_NAME}`);

// Read the HTML file
let html = fs.readFileSync('index.html', 'utf8');

// Add the secret as a data attribute to body
html = html.replace('<body>', `<body data-pokemon-name="${POKEMON_NAME}">`);

// Save the modified HTML
fs.writeFileSync('index.html', html);
console.log('✅ Secret injected into index.html');

// Also create a static version for GitHub Pages
const staticHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=index.html">
    <title>Redirecting...</title>
</head>
<body>
    <p>Redirecting to <a href="index.html">Pokemon page</a>...</p>
</body>
</html>
`;
fs.writeFileSync('index.html', html);
console.log('✅ Pokemon HTML generated with secret!');