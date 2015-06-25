var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var ejs = require('ejs');
var fs = require('fs');

var app = express();

app.get('/question', jsonParser, function(req, res) {

	fs.readFile('./quiz.ejs', {encoding: 'utf-8'}, function(err, filestring) {
		if(err) {
			throw err;
		} else {

			var options = {
				host: 'localhost',
				port: 3000,
				path: '/question',
				method: 'GET',
				headers: {
					accept: 'application/json'
				}
			}

			var externalRequest = http.request(options, function(externalResponse) {
				console.log('Connected');
				externalResponse.on('question', function(chunk) {
					console.log('1');
					var questiondata = JSON.parse(chunk);
					var html = ejs.render(filestring, questiondata);
					console.log('2');

					res.setHeader('content-type', 'text/html');
					console.log('3');
					res.writeHead(200);
					console.log('4');
					red.write(html);
					res.end();
				});
			});
			externalRequest.end();
		}
	}); 
});

app.listen(3001, function() {
	console.log("Server listens on Port 3001");
});