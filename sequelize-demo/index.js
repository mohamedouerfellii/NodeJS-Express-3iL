const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');

const dbConfig = require('./config');
const {Sequelize, Op, DataTypes, QueryTypes} = require('sequelize');

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

const sequelize = new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        query: {
            raw: true
        }
    }
);

const profsModel = require('./profsModel')(sequelize, DataTypes);

sequelize.sync();

profsModel.create({
    nom: "Ruchaud",
    prenom: "William",
    bureau: 210
}).then(data => {
    console.log("Prof créé : ", data.dataValues);
}).catch(err => {
    console.log("Erreur ", err.message);
});

profsModel.create({
    nom: "Oulad Moussa",
    prenom: "Mustapha",
    bureau: 213
}).then(data => {
    console.log("Prof créé : ", data.dataValues);
}).catch(err => {
    console.log("Erreur ", err.message);
});

profsModel.create({
    nom: "Chevry",
    prenom: "Benjamin",
    bureau: 218
}).then(data => {
    console.log("Prof créé : ", data.dataValues);
}).catch(err => {
    console.log("Erreur ", err.message);
});

profsModel.findAll().then(data => {
    console.log(data);
}).catch(err => {
    console.log("Erreur ", err.message);
});

profsModel.findAll({
    attributes: ['nom'],
    where: {bureau: {[Op.gt]: 215}}
}).then(data => {
    console.log(data);
}).catch(err => {
    console.log("Erreur ", err.message);
});

profsModel.findByPk(17).then(data => {
    console.log(data);
}).catch(err => {
    console.log("Erreur ", err.message);
});

profsModel.update(
    {bureau: 222},
    {where: {nom: "Mohamed"}}
).then(num => {
    console.log(num);
}).catch(err => {
    console.log("Erreur ", err.message);
});

profsModel.destroy(
    {where: {nom: "Ruchaud"}}
).then(num => {
    console.log(num);
}).catch(err => {
    console.log("Erreur ", err.message);
});

profsModel.findAll().then(data => {
    console.log(data);
}).catch(err => {
    console.log("Erreur ", err.message);
});

console.log("Exécution du SQL");
sequelize.query("INSERT INTO profs (nom, prenom, bureau, createdAt,updatedAt) VALUES (:n,:p,:b,:c,:u)",
    {
        replacements: {
            n:"Mohsen",
            p:"Esber",
            b: 120,
            c: '2020-05-04 23:44:00',
            u: '2020-05-04 23:44:00'
        },
        type: QueryTypes.INSERT
    }
    );

profsModel.findAll().then(data => {
    console.log(data);
}).catch(err => {
    console.log("Erreur ", err.message);
});
app.get("/", function (req, res) {
    res.send("API REST avec Express");
});

expressOasGenerator.handleRequests();

app.listen(8080, () => {
    console.log("listening on port 8080");
});