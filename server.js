var express = require('express');
var app = express();
var stations = require('./server/stations');
var errorMiddleware = require('./server/error-middleware');

app.use('/api/stations', stations)
app.use('/static', express.static(__dirname + '/client'));
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.last);

var port = process.env.PORT;
app.listen(port, function () {
  console.log('Vlille app listening on port ' + port);
});
