var express = require('express');
var app = express();
require('dotenv').config();
var stations = require('./server/stations');
var errorMiddleware = require('./server/error-middleware');

var nodeEnv = process.env.NODE_ENV;

if (nodeEnv === 'local') {
  app.use('/static', express.static(__dirname + '/client'));
}
app.use('/api/stations', stations);
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.last);

var port = process.env.PORT;
app.listen(port, function () {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  console.log('Vlille app listening on port ' + port);
});
