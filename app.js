"use strict;"

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;


let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'pug');

app.use('/messages', require('./routes/messages'));

app.listen(PORT, function(err) {
	console.log(err||"Server online");
});

// #whatdoesthatspellcrud



