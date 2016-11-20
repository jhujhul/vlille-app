var request = require('request');
var parseString = require('xml2js').parseString;

var API_BASE_URL = 'http://www.vlille.fr/stations/'

exports.getAllStations = function(callback) {
  request(API_BASE_URL + 'xml-stations.aspx', function (error, response, body) {
    if(error) {
      callback(error);
    }
    else if (response.statusCode == 200) {
      parseString(body, function (err, result) {
        var stationsList = result.markers.marker;
        var cleanStationList = stationsList.map(function(s) {
          var station = s.$;
          station.latitude = parseFloat(station.lat);
          station.longitude = parseFloat(station.lng);
          return station;
        });

        callback(null, cleanStationList);
      });
    }
    else {
      var err = new Error('Cannot reach api');
      callback(err);
    }
  });
};

exports.getStationById = function(id, callback) {
  request(API_BASE_URL + 'xml-station.aspx?borne=' + id, function (error, response, body) {
    if(error) {
      callback(error);
    }
    else if (response.statusCode == 200) {
      parseString(body, function (err, result) {
        var station = result.station;
        var cleanStation = {};
        for (var property in station) {
            if (station.hasOwnProperty(property)) {
                cleanStation[property] = station[property].length ? station[property][0] : '';
            }
        }
        cleanStation.bikes = parseInt(cleanStation.bikes);
        cleanStation.attachs = parseInt(cleanStation.attachs);

        callback(null, cleanStation);
      });
    }
    else {
      var err = new Error('Cannot reach api');
      callback(err);
    }
  });
};
