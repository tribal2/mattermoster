const debugExpress = require('debug')('mattermoster:express');
const debugServer = require('debug')('mattermoster:server');
const express = require('express');
const http = require('http');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const i18n = require("i18n");

const indexRouter = require('./routes/index');

/**
 * i18n Localization configuration
 */

i18n.configure({
  locales:[
    'en',
    'es',
  ],
  directory: __dirname + '/locales'
});

/**
 * EXPRESS APP
 */

const app = express();

/**
 * Class with methods to add plugins and start server
 *
 * @class Mattermoster
 */
class Mattermoster {
  constructor(locale) {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(i18n.init);
    app.use((req, res, next) => {
      res.setLocale(locale || 'en');
      next();
    });
    app.use('/', indexRouter);
  }

  addPlugin(endpoint, plugin) {
    app.use(endpoint, plugin);
  }

  init() {
    setRouteErrorHandlers();
    setHttpServer();
  }
}

function setRouteErrorHandlers() {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    debugExpress('ERROR: ' + err.message);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ msg: 'error'});
  });
}

function setHttpServer() {
  /**
   * Get port from environment and store in Express.
   */

  const port = normalizePort(process.argv[2] || process.env.PORT || '3000');
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Normalize a port into a number, string, or false.
   */
  function normalizePort(val) {
    const port = parseInt(val, 10);

    // named pipe
    if (isNaN(port)) return val;

    // port number
    if (port >= 0) return port;

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error) {
    if (error.syscall !== 'listen') throw error;

    const bind = (typeof port === 'string')
                ? 'Pipe ' + port
                : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;

      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;

      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    const addr = server.address();
    const bind = (typeof addr === 'string')
                ? 'pipe ' + addr
                : 'port ' + addr.port;
    debugServer('Listening on ' + bind);
  }
}

module.exports = Mattermoster;