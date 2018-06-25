const mongoose = require('mongoose');

const MeasurementSchema = new mongoose.Schema({
    point: {
        type: mongoose.Schema.Types.ObjectId,
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
    cadmium: Number,
    iron: Number,
    manganese: Number,
    copper: Number,
    nikel: Number,
    plumbum: Number,
    chrome: Number,
    zinc: Number,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Measurement', MeasurementSchema);
