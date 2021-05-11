const mongoose = require('mongoose');

const Product = mongoose.model('Product');

const MealSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: ''
    },
    ingredients: [Product.schema],
    weight: {
        type: Number,
        default: 0
    },
    protein: {
        type: Number,
        default: 0
    },
    carbs: {
        type: Number,
        default: 0
    },
    fats: {
        type: Number,
        default: 0
    },
    calories: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: 'https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?h=350&auto=compress&cs=tinysrgb'
    },
    category: {
        type: String,
        default: ''
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
}, {collection: "meals"});

module.exports = mongoose.model('Meal', MealSchema);