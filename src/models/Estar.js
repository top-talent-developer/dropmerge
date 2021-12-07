var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Estar = new Schema({
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
    collection: 'estars'
});

module.exports = Estar = mongoose.model('Estar', Estar);
