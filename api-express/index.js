const express = require('express');
const bodyParser = require('body-parser');
const profs = require("./data/profs");
const profsRouter = require('./routers/profsRouter').router;
const messagesRouter = require('./routers/messagesRouter').router;
// console.log(profs.getAll());
// console.log(profs.getById(187));
// console.log(profs.getById(1));
// profs.add("Ouerfelli", "Mohamed", "220");
// console.log(profs.getAll());
// console.log(profs.deleteById(187));
// console.log(profs.deleteById(1));
// console.log(profs.getAll());
// console.log(profs.update(188, "Ouerfelli", "Mohamed", "221"));
// console.log(profs.getAll());

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', profsRouter);
app.use('/api/v1', messagesRouter);

app.get("/", function (req, res) {
    res.send("API REST avec Express");
});

app.listen(8080, () => {
    console.log("listening on port 8080");
});