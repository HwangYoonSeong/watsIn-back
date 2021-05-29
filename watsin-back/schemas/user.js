const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    filterBit: {
        type: Number,
        default: 0
    },
    uid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userImg: {
        type: String,
        required: true
    }


}, { versionKey: false });

module.exports = mongoose.model('User', userSchema, 'user');