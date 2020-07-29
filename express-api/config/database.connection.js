const mongoose = require('mongoose');

const dbURL = require('./properties').DB;

module.exports = function(){
	//Connect Mongoose with Database URL
	
	mongoose.connect(dbURL).then(() => {
		console.log("Connected to Database");
	}).catch((err) => {
		console.log("Not Connected to Database ERROR! ", err);
	});
	//Connected Event
	mongoose.connection.on('connected',function(){
		console.log("Mongoose default connection is open to", dbURL);
	});
	
	//Error Event
	mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured "+err+" error");
    });
}
