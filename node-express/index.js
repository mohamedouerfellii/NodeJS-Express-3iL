const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
var messages = [];

app.use(express.static(path.join(__dirname, 'html')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello ExpressJS");
});

app.get('/about.html', (req, res) => {
    res.write("Voici la page about.html\n");
    res.write("Simule un fichier HTML\n");
    res.write("<h1>Mais sans le HTML</h1>");
    res.end();
});

app.get('/better-about.html', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.write("<h1>Ici c'est mieux</h1>");
    res.end();
});

app.get('/data', (req, res) => {
   // res.write('Donnees GET ');
   // res.write(req.query.message_get);
   // res.end();
    res.json(messages);
});

app.get('/data/:id', (req, res) => {
    if(messages[req.params.id]){
        res.json(messages[req.params.id]);
    } else {
        res.send("Indice non valide");
    }
});

app.post('/data', (req, res) => {
    // res.write('Donnees POST ');
    // res.write(req.body.message);
    // res.end();
    messages.push(req.body.message);
    res.redirect('/info.html');
});

app.listen(3000, () => {
    console.log("Listening 3000");
})