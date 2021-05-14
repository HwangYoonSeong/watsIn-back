const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    filterBit: {
        type: Number,
        required: true
    },
    uid: {
        type: String,
        required: true
    }

}, { versionKey: false });

module.exports = mongoose.model('User', userSchema, 'user');