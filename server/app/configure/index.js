'use strict';

module.exports = function(app) {
  app.setValue = app.set.bind(app);

  app.getValue = function(path) {
    return app.get(path);
  };

  if (process.env.NODE_ENV !== 'production') {
    require('./webpack-middleware')(app);
  }

  require('./app-variables')(app);
  require('./parsing-middleware')(app);
  require('./static-middleware')(app);

  app.use(app.getValue('log'));
};
