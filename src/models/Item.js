var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Item = new Schema({
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
    collection: 'items'
});

module.exports = Item = mongoose.model('Item', Item);
