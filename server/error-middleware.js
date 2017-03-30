var Boom = require('boom');

// 404 error middleware
exports.notFound = function (req, res, next) {
  var error = Boom.notFound('You may be lost :/');
  next(error);
};

exports.last = function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  var error;

  if(err.isBoom) {
    error = err;
  }
    // If error was not created by Boom, log error and send a 500 generic error
  else {
    var errorMessage = err.message;
    error = Boom.badImplementation(errorMessage);
  }

  res.status(error.output.statusCode);
  res.json(error.output.payload);
};
