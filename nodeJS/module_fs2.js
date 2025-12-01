const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var readFile = () => {
    fs.readFile('saisie.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log('Erreur de lecture du fichier ', err);
            return;
        }
        console.log("Données lues dans saisie.txt : ");
        console.log(data);
    });
}

rl.question('Texte à écrire dans un fichier : ', (data) => {
    fs.writeFile('saisie.txt', data, 'utf-8', (err) => {
        if (err) {
            console.log('Erreur écriture fichier ', err);
        }
    });
    rl.close();
    readFile();
});
