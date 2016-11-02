var express = require('express');
var app = express();
var stations = require('./server/stations')

app.use('/api/stations', stations)
app.use('/static', express.static(__dirname + '/client'));

app.listen(3000, function () {
  console.log('Vlille app listening on port 3000!');
});
