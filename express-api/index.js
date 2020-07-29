const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');	//input validation

const properties = require('./config/properties');
const clientService = require('./services/client.services.js');

const app = express();
const dbConn = require('./config/database.connection');	//database connection

//configure bodyparser
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

dbConn();	//database connection


app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
	next();
});


app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);	

//create
app.post('/create',[
	check('id').isNumeric(),
	check('name').isLength({min: 1 }),
	check('address').isLength({min: 1 }),
	check('phoneNumber').isNumeric({min: 1 }),
	check('email').isEmail()
],(req,res)=>{
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		var errorsList = [];
		errors.array().forEach(element => errorsList.push(element.msg));

		return res.status(404).json({ message: errorsList });
	}
	clientService.create(req,res);
});

//retrieve
app.get('/retrieve/', (req,res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(404).json({ errors: errors.array() });
	}
	clientService.retrieve(req,res);
});

//update
app.put('/update',[
	check('id').isNumeric(),
	check('name').isLength({min: 1 }),
	check('address').isLength({min: 1 }),
	check('phoneNumber').isNumeric({min: 1 }),
	check('email').isEmail()
],(req,res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(404).json({ errors: errors.array() });
	}
	clientService.update(req,res);
});

//delete
app.delete('/delete/:id',[check('id').isNumeric()], (req,res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(404).json({ errors: errors.array() });
	}
	
	clientService.delete(req,res);
});

const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Listening on port ${port}`));
