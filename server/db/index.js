'use strict';

var mongoose = require('mongoose');
var Promise = require('bluebird');
var path = require('path');
var chalk = require('chalk');


var DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;
var db = mongoose.connect(DATABASE_URI).connection;

// Require the models
require('./models/cat');

// Currently just return a good promise!
var startDbPromise = new Promise(function(resolve, reject) {
  db.on('open', resolve);
  db.on('error', reject);
});

console.log(chalk.yellow('Opening connection to MongoDB...'));
startDbPromise.then(function() {
  console.log(chalk.green('MongoDB connection opened!'));
});

module.exports = startDbPromise;
