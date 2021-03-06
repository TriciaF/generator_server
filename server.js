'use strict';

//initializations
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;

const { PORT, DEVICE_DATABASE_URL} = require('./config');

const app = express();

//initalize the routers
const deviceRouter = require('./device/router');


//CORS
app.all (function (req,res, next) {
	console.log('request = ', req.url, req.body, req.method);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow_Headers', 'content-type');
	res.setheader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}
	next();
});

app.use('/', deviceRouter);

app.use('*', (req, res) => {
	return res.status(404).json({ message: 'Not Found' });
});

// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer(dbURL) {
	 console.log('run server started');
	 return new Promise((resolve, reject) => {
	 	mongoose.connect(dbURL,  { useNewUrlParser: true }, err => {
			console.log('database = ', dbURL);
	 		if (err) {
	 		return reject(err);
	 		}
			console.log('database = ', dbURL);
			server = app.listen(PORT, () => {
				console.log(`Your app is listening on port ${PORT}`);
			 	resolve(server);
			})
	 		.on('error', err => {
    			mongoose.disconnect();
	 			reject(err);
	 		});
		 });
	});
}

// this function closes the server, and returns a promise. we'll
//  use it in our integration tests later.
function closeServer() {
	console.log('close server start');
	return mongoose.disconnect().then( () => {
	 	return new Promise((resolve, reject) => {
			console.log('Closing server');
	 		server.close(err => {
   		  		if (err) {
 					return reject(err);
 				}
 	        	resolve();
 	    	});
 	  	})
 	});
		 
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs.  but we also export the runServer comand so other code, like test code
// can start the server as needed
	if (require.main === module) {
		runServer(DEVICE_DATABASE_URL).catch(err => console.error(
			'Database did not start', err));
	}

module.exports  = {app, runServer, closeServer};

