const mongoose = require('mongoose');

const CountBrowseSchema = new mongoose.Schema({
    // J'ai chisis de tou mettre en string pour ne pas avoir des PB imprevisibles
    // pas de : , required: true [pas de validation pour l instant ]
    date: { type: String },
    countConnections: { type: String, default: "0" },
    adressIp: { type: String },
    siteweb: { type: String }
    // os: { type: String },

});

module.exports = mongoose.model('CountBrowse', CountBrowseSchema);