const profs = require("../data/profs");

module.exports = {
    getAll: function (req, res) {
        res.status(200).json(
            {
                "status": "success",
                "data": profs.getAll()
            }
        );
    },
    getById: function (req, res) {
        let id = req.params.id;
        let prof = profs.getById(id);

        if (!prof) {
            res.status(404).json({
                "status": "error",
                "message": "prof id invalide"
            });
            return;
        }
        res.status(200).json({
            "status": "success",
            "data": prof
        });
    },
    add: function (req, res) {
        let {nom, prenom, bureau} = req.body;
        if(nom == null || prenom == null || bureau == null) {
            res.status(409).json({
                "status": "error",
                "message": "Données incomplètes pour prof"
            });
            return;
        }
        profs.add(nom, prenom, bureau);
        res.status(201).json({
            "status": "success",
            "message": "Prof ajouté"
        });
    },
    update: function (req, res) {
        let id = req.body.id;
        console.log("id : " + id)
        let {nom, prenom, bureau} = req.body;
        if(nom == null || prenom == null || bureau == null) {
            res.status(409).json({
                "status": "error",
                "message": "Données incomplètes pour prof"
            });
            return;
        }

        if(!profs.update(id, nom, prenom, bureau)) {
            res.status(404).json({
                "status": "error",
                "message": "prof id invalide"
            });
            return;
        }
        res.status(200).json({
            "status": "success",
            "message": "Prof modifié"
        });
    },
    deleteById: function (req, res) {
        let id = req.params.id;
        if(!profs.deleteById(id)) {
            res.status(404).json({
                "status": "error",
                "message": "prod id invalide"
            });
            return;
        }
        res.status(204).json(
            {
            "status": "success",
            "message": "prof supprimé"
            }
        );
    },
}