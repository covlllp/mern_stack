'use strict';

var express = require('express');
var app = express();
module.exports = app;

require('./configure')(app);

app.get('/', function(req, res) {
  res.sendFile(app.get('indexHTMLPath'));
});
