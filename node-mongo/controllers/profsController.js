const mongoose = require('mongoose');
const ProfModel = require('../schema/ProfsSchema');

mongoose.connect('mongodb://127.0.0.1:27017/profs-db')
    .then(() => console.log('Connected to mongo db!'));


module.exports = {
    getAll: function (req, res) {
        ProfModel.find().then(result => {
            res.status(200).json(
                {
                    "status": "success",
                    "data": result
                }
            );
        }).catch(err => {
            console.log("Erreur ", err.message);
        });

    },
    getById: function (req, res) {
        let id = req.params.id;
        ProfModel.findById(id).then(data => {
            if (data) {
                res.status(200).json({
                    "status": "success",
                    "data": data
                });
            } else {
                res.status(404).json({
                    "status": "error",
                    "message": "prof id invalide"
                });
            }
        }).catch(err => {
            res.status(404).json({
                "status": "error",
                "message": "prof id invalide"
            });
        });
    },
    add: function (req, res) {
        let {nom, prenom, bureau} = req.body;
        if (nom == null || prenom == null || bureau == null) {
            res.status(409).json({
                "status": "error",
                "message": "Données incomplètes pour prof"
            });
            return;
        }
        const newProf = new ProfModel({
            LastName: nom, FirstName: prenom, Office: bureau
        });
        newProf.save().then(() => {
            res.status(201).json({
                "status": "success",
                "message": "Prof ajouté"
            });
        }).catch(err => {
            res.status(500).json({
                "status": "error",
                "message": "Internal server error"
            });
            console.log("Erreur ", err.message);
        });

    },
    update: function (req, res) {
        let {id, nom, prenom, bureau} = req.body;
        if (id == null || nom == null || prenom == null || bureau == null) {
            res.status(409).json({
                "status": "error",
                "message": "Données incomplètes pour prof"
            });
            return;
        }
        ProfModel.findByIdAndUpdate(
            id,
            {LastName: nom, FirstName: prenom, Office: bureau}
        ).then(data => {
            res.status(200).json({
                "status": "success",
                "message": "Prof modifié"
            });
        }).catch(err => {
            res.status(404).json({
                "status": "error",
                "message": "prof id invalide"
            });
        });

    },
    deleteById: function (req, res) {
        let id = req.params.id;
        ProfModel.findByIdAndDelete(id).then(result => {
            res.status(204).json(
                {
                    "status": "success",
                    "message": "prof supprimé"
                }
            );
        }).catch(err => {
            res.status(500).json({
                "status": "error",
                "message": "Internal server error"
            });
        });

    },
}






