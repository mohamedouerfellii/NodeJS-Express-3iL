const express = require('express');
const profsController = require('../controllers/profsController');

function buildRoutes() {
    let router = express.Router();

    router.route('/profs/').get(profsController.getAll);
    router.route('/profs/:id').get(profsController.getById);
    router.route('/profs/').post(profsController.add);
    router.route('/profs/:id').delete(profsController.deleteById);
    router.route('/profs/').put(profsController.update);

    return router;
}

exports.router = buildRoutes();