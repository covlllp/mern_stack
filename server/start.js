'use strict';

var chalk = require('chalk');
var server = require('http').createServer();

// ./db/index.js should return a promise that starts a mongo server connection
var startDb = require('./db');

var createApplication = function() {
  var app = require('./app');
  // Attach the app to the server
  server.on('request', app);
};

var startServer = function() {
  var PORT = process.env.PORT || 5000;
  server.listen(PORT, function() {
    console.log(chalk.blue('Server started on port ', chalk.magenta(PORT)));
  });
};

startDb.then(createApplication).then(startServer).catch(function(err) {
  console.error('Initialization error:', chalk.red(err.message));
});
