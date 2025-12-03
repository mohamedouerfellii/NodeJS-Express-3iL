const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const ProfSchema = new mongoose.Schema({
    ProfId: objectId,
    LastName: String,
    FirstName: String,
    Office: Number
});

module.exports = mongoose.model(
    'prof', ProfSchema, 'Professors');