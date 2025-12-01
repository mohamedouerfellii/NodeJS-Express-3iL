const express = require('express');
const messagesController = require('../controllers/messagesController');

function buildRoutes() {
    let router = express.Router();

    router.route('/messages/').get(messagesController.getAll);

    return router;
}

exports.router = buildRoutes();