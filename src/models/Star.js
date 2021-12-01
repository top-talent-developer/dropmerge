var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Star = new Schema({
    address: {
        type: String
    },
    star:{
        type:Number
    },
    dater:{
        type:String,
    },

},{
    collection: 'stars'
});

module.exports = Star = mongoose.model('Star', Star);
