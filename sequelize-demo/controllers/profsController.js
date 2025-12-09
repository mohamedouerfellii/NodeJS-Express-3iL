const bcrypt = require("bcrypt");
const profsModel = require("../connect").profsModel;
const jwtUtils = require('../utils/jwt.utils');


module.exports = {
    getAll: function (req, res) {
        profsModel.findAll().then(data => {
            res.status(200).json(
                {
                    "status": "success",
                    "data": data
                }
            );
        }).catch(err => {
            console.log("Erreur ", err.message);
        });

    },
    getById: function (req, res) {
        let id = req.params.id;
        profsModel.findByPk(id).then(data => {
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
        let {nom, prenom, bureau, password} = req.body;
        if (nom == null || prenom == null || bureau == null || password == null) {
            res.status(409).json({
                "status": "error",
                "message": "Données incomplètes pour prof"
            });
            return;
        }
        bcrypt.hash(password, 5, (err, encrypted) => {
            profsModel.create({
                nom: nom,
                prenom: prenom,
                bureau: bureau,
                password: encrypted
            }).then(data => {
                res.status(201).json({
                    "status": "success",
                    "message": "Prof ajouté"
                });
            }).catch(err => {
                console.log("Erreur ", err.message);
            });
        });
        /** create using sequelize query
         * sequelize.query("INSERT INTO profs (nom, prenom, bureau, createdAt,updatedAt) VALUES (:n,:p,:b,:c,:u)",
         *     {
         *         replacements: {
         *             n:nom,
         *             p:prenom,
         *             b: bureau,
         *             c: '2020-05-04 23:44:00',
         *             u: '2020-05-04 23:44:00'
         *         },
         *         type: QueryTypes.INSERT
         *     }
         * );
         */
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
        profsModel.update(
            {
                nom: nom,
                prenom: prenom,
                bureau: bureau
            },
            {where: {id: id}}
        ).then(num => {
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
        profsModel.destroy(
            {where: {id: id}}
        ).then(num => {
            res.status(204).json(
                {
                    "status": "success",
                    "message": "prof supprimé"
                }
            );
            console.log(num);
        }).catch(err => {
            res.status(404).json({
                "status": "error",
                "message": "prod id invalide"
            });
            console.log("Erreur ", err.message);
        });
    },
    login: function (req, res) {
        let {nom, password} = req.body;
        if(nom == null || password == null) {
            res.status(409).json({
                "status": "error",
                "message": "Données incomplètes pour authentification"
            });
            return;
        }
        profsModel.findOne({ where: { nom: nom } })
            .then((profFound) => {
                if (profFound) {
                    bcrypt.compare(password, profFound.password, (err, resBcrypt) => {

                        if (resBcrypt) {
                            res.status(200).json({
                                status: 'success',
                                profId: profFound.id,
                                token: jwtUtils.generateTokenForUser(profFound)
                            });
                            return;

                        } else {
                            res.status(403).json({
                                status: 'error',
                                message: 'donnees de connexion invalides'
                            });
                        }
                    });

                } else {
                    res.status(403).json({
                        status: 'error',
                        message: 'donnees de connexion invalides'
                    });
                }
            });
    }
}


// profsModel.findAll({
//     attributes: ['nom'],
//     where: {bureau: {[Op.gt]: 215}}
// }).then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log("Erreur ", err.message);
// });





