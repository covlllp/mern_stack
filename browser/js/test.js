'use strict';

var React = require('react');

var reactClass = React.createClass({
  render: function() {
    return (
      <div className="hello">
        Hello, {this.props.name}
      </div>
    );
  }
});

module.exports = reactClass;
