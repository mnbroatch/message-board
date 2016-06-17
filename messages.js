"use strict;"


const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, "messages.json");



exports.create = function(body,cb) {
	readMessages( function(err,messages){
		if(err) return cb(err); 
		body.id = uuid();
		body.timestamp = Date.now();
		messages.push(body);
		writeMessages(messages,cb)
	});
}

exports.retrieveAll = cb => {
	readMessages(cb);
}

exports.retrieveOne = function(id,cb) {
	readMessages( function(err,messages){
		if(err) return cb(err); 
		for (var i = 0, len = messages.length; i < len; i++){
			if (messages[i].id === id){
				var message = messages[i];
				break;
			}
		}
		cb(null,message);
	});
}

exports.update = function(body,id,cb) {
	readMessages( function(err,messages){
		if(err) return cb(err); 
		for (var i = 0, len = messages.length; i < len; i++){ 
			if (messages[i].id === id){
				var messageToEdit = messages.splice(i,1)[0];
				break;
			}
		}
		for (prop in body) {
			messageToEdit[prop] = body[prop];	
		}
		messages.push(messageToEdit);

		writeMessages(messages,cb)
	});
}

exports.delete = function(id,cb) {
	readMessages( function(err,messages){
		if(err) return cb(err); 
		for (var i = 0, len = messages.length; i < len; i++){
			if (messages[i].id === id){
				messages.splice(i,1);
				break;
			}
		}
		writeMessages(messages,cb)
	});
}







function writeMessages(messages,cb){
	fs.writeFile(dataPath, JSON.stringify(messages), cb);
}



function readMessages(cb){
	fs.readFile(dataPath, function(err,data){
		if(err) return cb(err); 		 	
		try{ 
			var messagesArray = JSON.parse(data);
		} catch(e) {
			cb(e);
		} 
		cb(null,messagesArray);	
	});
}



