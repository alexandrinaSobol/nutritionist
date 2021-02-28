const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name : {
    type : String,
    default : ''
  },
  calories : {
    type : Number,
    default : 0
  },
  foto_link : {
    type : String,
    default : '',
  },
  partea_zilei : {
    type : String,
    default : ''
  }
}, {collection: "food"});

module.exports = mongoose.model('Food', GroupSchema);