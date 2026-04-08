console.log("=== Testing GitHub Secrets ===\n");

// These will come from GitHub's secret storage
const dbPassword = process.env.DB_PASSWORD;
const apiToken = process.env.API_TOKEN;

console.log("Database Password:", dbPassword);
console.log("API Token:", apiToken);

document.getElementById("myParagraph").textContent = `pass:${dbPassword}, apiToken:${apiToken}`;