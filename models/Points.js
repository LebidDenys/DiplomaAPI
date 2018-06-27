const mongoose = require('mongoose');

const PointsSchema = new mongoose.Schema({
    pointNumber: {
        type: Number,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Point', PointsSchema);


