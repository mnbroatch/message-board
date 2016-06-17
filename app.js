"use strict;"

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;

const messages = require('./messages.js');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(morgan('dev'));


// gimme a C!
app.post('/message', function(req,res){
	messages.create(req.body, function(err,messages){
		if(err) return res.status(400).send(err); 
	});
});

// gimme an R!
app.get('/message', function(req,res){

	messages.retrieveAll(req.query.sort, function(err,messages){
		if(err) return res.status(400).send(err); 
		res.send(messages);
	});
});

// gimme a...nother R!
app.get('/message/:id', function(req,res){
	messages.retrieveOne(req.params.id, function(err,message){
		if(err) return res.status(400).send(err); 
		res.send(message);
	});
});


// gimme a U!
app.put('/message/:id', function(req,res){
	messages.update(req.body, req.params.id, function(err){
		if(err) return res.status(400).send(err); 
	});
});


// gimme a D!
app.delete('/message/:id', function(req,res){
	messages.delete(req.params.id, function(err,message){
		if(err) return res.status(400).send(err); 
		res.send(message);
	});
});


app.listen(PORT, function(err) {
	console.log(err||"Server online");
});

// #whatdoesthatspellcrud



