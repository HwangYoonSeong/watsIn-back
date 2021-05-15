const mongoose = require('mongoose');
const { Schema } = mongoose;

const postListSchema = new Schema({

    title: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
        type: String,
        default: "2021-05-15 1:14"
    },
    writer: {
        type: String,
        default: "Yooncastle"
    },
    thumbnail: {
        type: String,
        default: "default.jpg"
    }

}, { versionKey: false });

module.exports = mongoose.model('PostList', postListSchema, 'postList');