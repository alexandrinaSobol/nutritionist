const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: ''
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
    weight: {
        type: Number,
        default: 100
    }
}, {collection: "products"});

module.exports = mongoose.model('Product', ProductSchema);