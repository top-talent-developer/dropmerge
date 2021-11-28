var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Count = new Schema({
    address: {
        type: String
    },
    dater:{
        type:String,
    },

},{
    collection: 'counts'
});

module.exports = Count = mongoose.model('Count', Count);
