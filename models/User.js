const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

const UserSchema = new mongoose.Schema({
        _id: {
            type: String,
            default: uuid(),
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        }
    }
)
module.exports = mongoose.model('User', UserSchema);
