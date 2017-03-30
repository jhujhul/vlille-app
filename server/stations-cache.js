var async = require('async');
var CronJob = require('cron').CronJob;
var vlilleApi = require('./vlille-api');

var cachedStations = [];

initialFetchAndStartCronJob();

exports.getAll = getAllCachedStations;
exports.getById = getCachedStationById;
exports.fetchById = fetchById;

function getAllCachedStations() {
  return cachedStations;
}

function getCachedStationById(id) {
  var station = cachedStations.find(function(s) {
    return s.id === id;
  });

  return station;
}

function initialFetchAndStartCronJob() {
  async.series([
        // Fetch all stations
    fetchAllStations,
        // 2 minutes later, start a cron job
        // Cron job fetch all stations every 5 minutes
    function() {
      setTimeout(function () {
        console.log('Start cron job');
        new CronJob('10 */5 * * * *',
          fetchAllStations,
          null,
          true
        );
      }, 2 * 60 * 1000);
    }
  ]);
}

function fetchAllStations(callback) {
  callback = callback || noop;  // callback is optionnal

  async.series([
    fetchStationsList,
    fetchEveryStations
  ], function(err) {
    if(err) {
      return callback(err);
    }

    console.log('All stations  fetched');
    callback();
  });
}

var noop = function() {
  return undefined;
}; // do nothing.

function fetchStationsList(callback) {
  vlilleApi.getAllStations(function(err, fetchedStations) {
    if(err) {
      return callback(err);
    }

    var newCachedStations = [];

    for(var i = 0; i < fetchedStations.length; i++) {
      var fetchedStation = fetchedStations[i];
      var cachedStation = getCachedStationById(fetchedStation.id);
      var newCachedStation = Object.assign({}, cachedStation, fetchedStation);

      newCachedStations.push(newCachedStation);
    }

    cachedStations = newCachedStations;
    callback();
  });
}

function fetchEveryStations(callback) {
  async.eachSeries(cachedStations,
        updateCachedStation,
        function(err) {
          if(err) {
            return callback(err);
          }
          callback();
        }
    );
}

function fetchById(id, callback) {
  var cachedStation = getCachedStationById(id);

  updateCachedStation(cachedStation, function(err) {
    if(err) {
      return callback(err);
    }

    callback(null, cachedStation);
  });
}

function updateCachedStation(cachedStation, callback) {
  vlilleApi.getStationById(cachedStation.id, function(err, fetchedStation) {
    if(err) {
      return callback(err);
    }

    Object.assign(cachedStation, fetchedStation);
    callback();
  });
}
