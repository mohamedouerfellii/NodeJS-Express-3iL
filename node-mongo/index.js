const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');

const mongoose = require('mongoose');
const ProfModel = require('./schema/ProfsSchema');

const expressOasGenerator = require('express-oas-generator');

const app = express();

expressOasGenerator.handleResponses(app, {});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs'),
});
app.use(morgan('combined', {stream: accessLogStream}));

mongoose.connect('mongodb://127.0.0.1:27017/profs-db')
    .then(() => console.log('Connected to mongo db!'));

console.log("Create prof");
const newProf = new ProfModel({
    LastName: "Ouerfelli", FirstName: "Mohamed", Office: 10
});

newProf.save().then(() => {
    console.log("Created")
});

ProfModel.find().exec().then(result => {
    console.log(result)
});
console.log("Delete prof");
ProfModel.findByIdAndDelete('692f0551db4eb730a87d22b6').exec();

ProfModel.find().exec().then(result => {
    console.log(result)
});

app.get("/", function (req, res) {
    res.send("API REST avec Express");
});

expressOasGenerator.handleRequests();

app.listen(8080, () => {
    console.log("listening on port 8080");
});