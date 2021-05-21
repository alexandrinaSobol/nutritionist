const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    steps: [{
        type: String
    }],
    meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal'
    },
    imageUrl: [{
        type: String,
        default: 'https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?h=350&auto=compress&cs=tinysrgb'
    }],
    prepareTime: {
        type: String,
        default: 'NaN'
    }
}, {collection: "recipes"});

module.exports = mongoose.model('Recipe', RecipeSchema);