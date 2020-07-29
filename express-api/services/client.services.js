const dao =  require('../dao/client.dao');
const dbconn =  require('../config/database.connection');

module.exports.create = (req,res) => {
	var clientId = {"id" : req.body.id };
	var check = dao.checkId(clientId, (err,result) => {
		if(result == null){
			var clientData = req.body;
			dao.create(clientData, (err) => {
				if(err){
					res.json({error : err});
				}
				res.json({ message : "client created successfully" });
			});
		} else {
			console.log(result);
			res.json({ message : "Id already exist." });
		}
	});
}

module.exports.retrieve = (req,res) => {
	dao.retrieve(function(err,result){
		if(err){
			res.json({error : err});
		}
		res.json(result);
	});
}
		
module.exports.update = (req,res) => {
	var clientId = {"id" : req.body.id};
	var check = dao.checkId(clientId, (err,result) => {
		if(result){
			//update the values
			var clientData = req.body;
			dao.update(clientData, (err) => {
				if(err){
					res.json({error : err});
				}
				res.json({ message : "client updated successfully" });
			});
		}
		else{
			res.json({message : "clientId is not exist"});
		}
	});
	
}

//delete
module.exports.delete = (req,res) => {
	var clientId = { "id" : req.params.id };
	var check = dao.checkId(clientId, (err,result) => {
		if(result){
			dao.delete(clientId, (err) => {
				if(err){
					res.json({error : err});
				}
				res.json({
					message : "client deleted successfully"
				});
			});
		}
		else{
			res.json({message : "clientId is not exist"});
		}
	});	
}

