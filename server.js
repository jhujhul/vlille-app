var express = require('express');
var app = express();
var request = require('request');
var parseString = require('xml2js').parseString;

app.get('/stations', function(req, res) {
  request('http://www.vlille.fr/stations/xml-stations.aspx', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseString(body, function (err, result) {
          res.send(result.markers.marker);
      });
    }
  });
});

app.use('/static', express.static(__dirname + '/client'));

app.listen(3000, function () {
  console.log('Vlille app listening on port 3000!');
});
