'use strict';

var path = require('path');
var express = require('express');

module.exports = function(app) {
  var root = app.getValue('projectRoot');
  var bowerPath = path.join(root, './bower_components');
  var publicPath = path.join(root, './public');

  app.use(express.static(bowerPath));
  app.use(express.static(publicPath));
};
