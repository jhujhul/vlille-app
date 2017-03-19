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

router.get('/:id', function(req, res, next) {
  var stationId = req.params.id;
  var station = stationsCache.getById(stationId);

  if(!station) {
    var error = Boom.notFound('No station found with id = ' + stationId);
    return next(error);
  }
  
  // If station was updated less than 2 minutes ago, send it from cache
  if(getMinutesFromNow(station.lastUpdate) < 2) {
    return res.send(station);
  }

  // Else fetch if
  stationsCache.fetchById(stationId, function(err, station) {
    if(err) {
      return next(err);
    }

    res.send(station);
  });
});

function getMinutesFromNow(isoDate) {
  var now = new Date();
  var then = new Date(isoDate);
  var differenceInMinutes =  ( now - then ) / ( 1000 * 60 );
  
  return differenceInMinutes;
}

module.exports = router;
