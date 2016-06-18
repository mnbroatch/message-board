"use strict";

const express = require('express');
let router = express.Router();
let Message = require('../models/message');

// gimme a C!
router.post('/', function(req,res){
	Message.create(req.body, function(err,message){
		if(err) return res.status(400).send(err); 
		res.send(message);
	});
});

// gimme an R!
router.get('/', function(req,res){
	Message.retrieveAll(req.query.sort, function(err,messages){
		if(err) return res.status(400).send(err); 
		res.render('index', {messages:messages});
	});
});

// gimme a...nother R!
router.get('/all', function(req,res){
	Message.retrieveAll(req.query.sort, function(err,messages){
		if(err) return res.status(400).send(err); 
		res.send(messages);
	});
});

// gimme yet another R!
router.get('/:id', function(req,res){
	Message.retrieveOne(req.params.id, function(err,message){
		if(err) return res.status(400).send(err); 
		res.send(message);
	});
});

// gimme a U!
router.put('/:id', function(req,res){
	Message.update(req.body, req.params.id, function(err){
		if(err) return res.status(400).send(err); 
		res.send('message edited');
	});
});

// gimme a D!
router.delete('/:id', function(req,res){
	Message.delete(req.params.id, function(err,message){
		if(err) return res.status(400).send(err); 
		res.send('message deleted');
	});
});

module.exports = router;
