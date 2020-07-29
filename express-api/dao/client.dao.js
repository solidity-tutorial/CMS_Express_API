const mongoose = require('mongoose');
const Model = require('./client.schema');

module.exports.create = (clientData,cb) => {
	var document = new Model(clientData);
	document.save(cb);
}

module.exports.retrieve = (cb) => {
	Model.find({},cb);
}

module.exports.update = (clientData,cb) => {
	Model.updateOne({ "id" : clientData.id },clientData,cb);
}

module.exports.delete = (clientId,cb) => {
	Model.deleteOne(clientId,cb);
}

module.exports.checkId = (client,cb) => {
	Model.findOne(client,cb);
}
