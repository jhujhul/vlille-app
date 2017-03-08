var async = require('async');
var CronJob = require('cron').CronJob;
var vlilleApi = require('./vlille-api');

var cachedStations = [];

initialFetchAndStartCronJob();

exports.getAll = getAllCachedStations;
exports.getById = getCachedStationById;

function getAllCachedStations() {
    return cachedStations;
}

function getCachedStationById(id) {
    var station = cachedStations.find(function(s) {
        return s.id === id;
    });

    console.log('station', station)

    return station;
}

exports.updateList = function(stations) {
    var updateCachedStations = [];

    for(var i = O; i < stations.length; i++) {
        var station = stations[i];
        var cachedStation = getCachedStationById(station.id);
        var updateCachedStation = Object.assign({}, cachedStation, station);
        updateCachedStations.push(updateCachedStation);
    }

    cachedStations = updateCachedStations;
};

function initialFetchAndStartCronJob() {
    async.series([
        // Fetch all stations
        fetchAllStations,
        // 2 minutes later, start a cron job
        // Cron job fetch all stations every 5 minutes
        function() {
            setTimeout(function () {
                console.log("Start cron job");
                var job = new CronJob('10 */5 * * * *', 
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

        callback();
    });
};

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

            newCachedStation = Object.assign({}, cachedStation, fetchedStation);
            newCachedStations.push(newCachedStation);
        }

        cachedStations = newCachedStations;
        console.log("Stations list fetched");
        callback();
    });
};

function fetchEveryStations(callback) {
    async.eachSeries(cachedStations, function(cachedStation, cb) {
        vlilleApi.getStationById(cachedStation.id, function(err, fetchedStation) {
            if(err) {
                return cb(err);
            }

            Object.assign(cachedStation, fetchedStation);
            console.log("Station " + cachedStation.name + " fetched");
            cb();
        })
    }, function(err) {
        if(err) {
            return callback(err);
        }
        callback();
    });
}