const mongoose = require('mongoose');

const vmSchema = new mongoose.Schema({
    // J'ai chisis de tou mettre en string pour ne pas avoir des PB imprevisibles
    // pas de : , required: true [pas de validation pour l instant ]
    nom: { type: String },
    adressIp: { type: String },
    os: { type: String },
    etat: { type: String},
});

module.exports = mongoose.model('Vm', vmSchema);