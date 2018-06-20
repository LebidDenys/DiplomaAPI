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
    },
});

UserSchema.pre('save', function (next) {
    const admin = this;
    bcrypt.hash(admin.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        admin.password = hash;
        next();
    })
});

module.exports = mongoose.model('User', UserSchema);
