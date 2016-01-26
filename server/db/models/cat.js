'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    type: String
  },
  color: {
    type: String,
    enum: ['black', 'white', 'blue']
  }
});

mongoose.model('Cat', schema);
