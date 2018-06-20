const mongoose = require('mongoose');

const MeasurementSchema = new mongoose.Schema({
    lat: Number,
    lng: Number,
    year: Number,
    month: String,
    plumbum: Number,
    cadmium: Number,
    zinc: Number,
    copper: Number,
    chrome: Number,
    nikel: Number,
    iron: Number,
    manganese: Number,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Measurement', MeasurementSchema);
