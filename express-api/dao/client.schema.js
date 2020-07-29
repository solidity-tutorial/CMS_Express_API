const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define Schema
var clientSchema = new Schema({
	
	id: {
		type: String,
		unique : true,
		required : true
	},
	name : {
		type: String,
		unique : false,
		required : false
	},
	email : {
		type: String,
		unique : false,
		required : false
	}
}, {
	timestamps: true
});

module.exports = mongoose.model("client",clientSchema,"clientCollection");
