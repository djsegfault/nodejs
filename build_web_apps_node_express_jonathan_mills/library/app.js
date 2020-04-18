// Pull in the dependencies
var express = require('express');
var chalk = require('chalk');

// Globals
var app = express();

// Route for / to anonymous handler function 
app.get('/', function (req, res) {
	res.send("Hello from my library app");
});
	
app.listen(3000, function () {
	console.log('Listening on port ' + chalk.green('3000') + '.');
});
