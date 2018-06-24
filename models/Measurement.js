const mongoose = require('mongoose');

const MeasurementSchema = new mongoose.Schema({
    point: {
        type: String,
        ref: 'Point',
    },
    year: {
        type: Number,
        default: 2007,
    },
    month: {
        type: String,
        required: true,
    },
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
