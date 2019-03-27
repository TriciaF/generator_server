'use strict';

const express = require('express');
//const mongoose = require('mongoose');



//mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = required('./config');

const app = express();

//CORS
app.use (function (req,res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow_headers', 'Origin, X-Requested-With, Content-Type, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	if (req.method === 'OPTIONS') {
		return res.SendStatus(204);
	}
	next();
});




app.use('*', (req, res) => {
	return res.status(404).json({ message: 'Not Found' });
});

// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

 	function runServer(databaseUrl = DATABASE_URL, port = '8080') {
 	  return new Promise((resolve, reject) => {
 	  //mongoose.connect(databaseUrl,  err => {
 	  if (err) {
 	    return reject(err);
 	  }
 	  server = app.listen(port, () => {
 	  console.log(`Your app is listening on port ${port}`);
 	  resolve(server);
 	  })
 	  .on('error', err => {
 	  //mongoose.disconnect();
 	    reject(err);
 	  });
    });
 }

// this function closes the server, and returns a promise. we'll
//  use it in our integration tests later.
	function closeServer() {
  	  return new Promise((resolve, reject) => {
 	    //mongoose.disconnect();
 	    console.log('Closing server');
       	    server.close(err => {
 		console.error(err);
   		  if (err) {
 			return reject(err);
 		}
 	        resolve();
 	    });
 	  })
 	  .catch(err =>{
		return console.log(err);
 	  });
 	}

// if server.js is called directly (aka, with `node server.js`), this block
// runs.  but we also export the runServer comand so other code, like test code
// can start the server as needed
	if (required.main === module) {
		runServer().catch( err => console.err(err));
	}

module.exports = {app, runServer, closeServer};

