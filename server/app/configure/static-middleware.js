'use strict';

var path = require('path');
var express = require('express');

module.exports = function(app) {
  var root = app.getValue('projectRoot');
  var publicPath = path.join(root, './build/public');

  app.use(express.static(publicPath));
};
