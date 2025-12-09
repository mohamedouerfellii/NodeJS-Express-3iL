const messagesModel = require("../connect").messagesModel;
const jwtUtils = require('../utils/jwt.utils');

module.exports = {
    getAll: function (req, res) {
        let headerAuth = req.headers.authorization;
        let profId = jwtUtils.getUserId(headerAuth);
        if(profId === -1) {
            res.status(403).json({
                status: "error",
                message: "acces interdit"
            });
            return;
        }
        messagesModel.findAll().then(data => {
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
    add: function (req, res) {
        let {content} = req.body;
        if (content == null ) {
            res.status(409).json({
                "status": "error",
                "message": "Données incomplètes pour message"
            });
            return;
        }
        messagesModel.create({
            content: content,
        }).then(data => {
            res.status(201).json({
                "status": "success",
                "message": "Message ajouté"
            });
        }).catch(err => {
            console.log("Erreur ", err.message);
        });

    }
}
