const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const profsRouter = require('./routers/profsRouter').router;

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

app.use('/api/v1', profsRouter);


app.get("/", function (req, res) {
    res.send("API REST avec Express");
});

expressOasGenerator.handleRequests();

app.listen(8080, () => {
    console.log("listening on port 8080");
});