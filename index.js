console.log("=== Testing GitHub Secrets ===\n");

// These come from GitHub's secret storage
const dbPassword = process.env.DB_PASSWORD;
const apiToken = process.env.API_TOKEN;

console.log("Database Password:", dbPassword);
console.log("API Token:", apiToken);

// Show the length to prove they exist (even though values are hidden)
console.log("\n📊 Password length:", dbPassword?.length || 0);
console.log("🔑 Token length:", apiToken?.length || 0);

if (dbPassword && apiToken) {
    console.log("\n✅ Success! Secrets are working!");
    console.log("💡 The values show as '***' in logs because GitHub masks them automatically");
} else {
    console.log("\n❌ Secrets not found! Did you add them in GitHub Settings?");
    console.log("Go to: Your repo → Settings → Secrets and variables → Actions");
}

document.getElementById("myParagraph").textContent = `pass:${dbPassword}, apiToken:${apiToken}`;