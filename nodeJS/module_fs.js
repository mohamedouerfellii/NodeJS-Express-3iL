const fs = require('fs');

fs.readFile('test.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('Erreur de lecture du fichier ', err);
        return;
    }

    console.log("Données lues dans test.txt : ");
    console.log(data);
});