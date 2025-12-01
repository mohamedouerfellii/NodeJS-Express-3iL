const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');
const data = require('./data');

const app = express();

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname+'/templates',
    partialsDir: __dirname+'/partials',
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

app.get('/hello/{:name}', (req, res) => {
    let name = 'les amis';
    if(req.params.name){
        name = req.params.name;
    }
    res.render('hello', {
        name: name
    });
});

app.get('/languages', (req, res) => {
    res.render('languages', {
        ...data.languagesList,
        layout: 'centered',
        helpers: {
            commentsCount:(language) => {
                if(language.comments) {
                    return `<small>(${language.comments.length})</small>`;
                }
            }
        }
    });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
})