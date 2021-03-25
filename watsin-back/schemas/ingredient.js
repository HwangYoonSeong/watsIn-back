const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientSchema = new Schema({
    RCP_NM: {
        type: String,
        default: null
    },
    ingredients: {
        type: String,
        default: null
    }

}, { versionKey: false });

module.exports = mongoose.model('Ingredient', ingredientSchema, 'ingredient');