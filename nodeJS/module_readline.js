const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Entrez quelque chose : ', (data) => {
    console.log("Vous avez tapé : "+data);
    rl.close();
});