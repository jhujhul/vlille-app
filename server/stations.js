var express = require('express');
var router = express.Router();
var Boom = require('boom');
var async = require('async');
var vlilleApi = require('./vlille-api');
var stationsCache = require('./stations-cache');

router.get('/', function(req, res, next) {
  var stations = stationsCache.getAll();
  res.send(stations);
});

function getLiveDataForStations(stations, callback) {
  var liveStationsList = [];

  async.each(stations, function(station, callback) {
    vlilleApi.getStationById(station.id, function(err, liveStation) {
      if(err) {
        callback(err);
      }
      else {
        liveStationsList.push(Object.assign(liveStation, station));
        callback();
      }
    });
  }, function(err) {
    if(err) {
      return callback(err);
    }
    callback(null, liveStationsList);
  });
}

router.get('/:id', function(req, res, next) {
  var station = stationsCache.getById(req.params.id);

  if(!station) {
    var error = Boom.notFound('No station found with id = ' + req.params.id);
    return next(error);
  }

  if(getMinutesFromNow(station.lastUpdate) < 2) {
    return res.send(station);
  }

  
});

function getMinutesFromNow(isoDate) {
  var now = new Date();
  var then = new Date(isoDate);
  var differenceInMinutes =  ( now - then ) / ( 1000 * 60 );
  
  return differenceInMinutes;
}

module.exports = router;
