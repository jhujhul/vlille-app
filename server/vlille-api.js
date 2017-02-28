var request = require('request');
var parseString = require('xml2js').parseString;
// var StationsCache = require('./stations-cache');

var API_BASE_URL = 'http://www.vlille.fr/stations/'

exports.getAllStations = function(callback) {
  var url = API_BASE_URL + 'xml-stations.aspx';

  request(url, function (error, response, body) {
    if(error) {
      return callback(error);
    }

    if(response.statusCode !== 200) {
      var err = new Error('Cannot reach vlille api');
      return callback(err);
    }

    parseString(body, function (err, result) {
      var stationsList = result.markers.marker;
      var cleanStationList = stationsList.map(function(s) {
        var station = s.$;
        
        return {
          id: station.id,
          name: station.name,
          latitude: parseFloat(station.lat),
          longitude: parseFloat(station.lng)
        }
      });

      // StationsCache.updateList(cleanStationList);

      callback(null, cleanStationList);
    });
  });
};

exports.getStationById = function(id, callback) {
  var url = API_BASE_URL + 'xml-station.aspx?borne=' + id;

  request(url, function (error, response, body) {
    if(error) {
      return callback(error);
    }

    if(response.statusCode !== 200) {
      var err = new Error('Cannot reach vlille api');
      return callback(err);
    }

    parseString(body, function (err, result) {
      var station = result.station;
      var cleanStation = {
        adress: station.adress[0],
        status: station.status[0],
        bikes: parseInt(station.bikes[0]),
        attachs: parseInt(station.attachs[0]),
        paiement: station.paiement[0],
        lastUpdate: parseLastUp(station.lastupd[0])
      };

      callback(null, cleanStation);
    });
  });
};

// Parse 'lastupd' string property sent by vlille api to an iso date
// lastupd is in 'x secondes' format, ie: '36 secondes'
function parseLastUp(lastupd) {
  var re = /(\d+) secondes/;
  var result = re.exec(lastupd);
  var numberOfSeconds = result[1];

  return getDateXSecondsFromNow(numberOfSeconds);
}

// Return a date in ISO string format, x seconds before now
function getDateXSecondsFromNow(seconds) {
  var date = new Date();
  date.setSeconds(date.getSeconds() - seconds);

  return date.toISOString();
}