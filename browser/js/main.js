'use strict';

var ReactDOM = require('react-dom');
var React = require('react');

require('./../scss/main.scss');

var Greeting = require('./test');

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Greeting name="Colin" />,
    document.getElementById('content')
  );
});
