var express = require('express');
var router = express.Router();
var vlilleApi = require('./vlille-api');
var async = require('async');
var stationsCache = require('./stations-cache');

router.get('/', function(req, res, next) {
  var stations = stationsCache.getAll();
  res.send(stations);

  // stationsCache.fetchStationsList(function(err, stations) {
  //   if(err) {
  //     return next(err);
  //   }

  //   res.send(stations);
  // })
  

  // async.waterfall([
  //   vlilleApi.getAllStations,
  //   // getLiveDataForStations
  // ], function(err, stations) {
  //   if(err) {
  //     next(err);
  //   }
  //   else {
  //     // res.set('Cache-Control', 'public, max-age=120000');
  //     res.send(stations);
  //   }
  // });

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
  vlilleApi.getStationById(req.params.id, function(err, station) {
    if(err) {
      next(err);
    }
    else {
      // res.set('Cache-Control', 'max-age=120');
      res.send(station);
    }
  });
});

module.exports = router;
