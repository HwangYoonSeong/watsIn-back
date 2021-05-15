const mongoose = require('mongoose');
const { Schema } = mongoose;

const postListSchema = new Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
        type: String,
    },
    writer: {
        type: String,
    },
    thumbnail: {
        type: String,
    }

}, { versionKey: false });

module.exports = mongoose.model('PostList', postListSchema, 'postList');