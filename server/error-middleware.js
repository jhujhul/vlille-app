var Boom = require('boom');

// 404 error middleware
exports.notFound = function(req, res, next) {
  var error = Boom.notFound('You may be lost :/');
  next(error);
};

exports.last = function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  var error;

  if (err.isBoom) {
    error = err;
  } else {
    // If error was not created by Boom, send a 500 generic error
    console.log('err', err);
    var errorMessage = err.message;
    error = Boom.badImplementation(errorMessage);
  }

  res.status(error.output.statusCode);
  res.json(error.output.payload);
};
