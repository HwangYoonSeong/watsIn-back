const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientListSchema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    checked: {
        type: Boolean,
    },
    id: {
        type: Number,
    }

}, { versionKey: false });

module.exports = mongoose.model('IngredientList', ingredientListSchema, 'ingredientList');