var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var  Every= new Schema({
    address: {
        type: String
    },
    score:{
        type:Number,
        default:0,
    },
    dater:{
        type:String,
    },

},{
    collection: 'everys'
});

module.exports = Every = mongoose.model('Everys', Every);
