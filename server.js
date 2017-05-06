var express = require('express');
var app = express();
require('dotenv').config();
var cors = require('cors');
var stations = require('./server/stations');
var errorMiddleware = require('./server/error-middleware');

var corsOptions = {
  origin: 'http://vlille-app.s3-website.eu-west-2.amazonaws.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

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
