angular
  .module('app')
  .factory('AppService', function AppService ($http, $q) {
    var stations = [];

    var service = {
      getAllStations: getAllStations,
      getStationById: getStationById,
      fetchAllStations: fetchAllStations,
      fetchStationById: fetchStationById
    };

    return service;

    function getAllStations() {
      return stations;
    }

    function getStationById(id) {
      for (var i = 0; i < stations.length; i++) {
        if(stations[i].id === id) {
          return stations[i];
        }
      }
      return {};
    }

    function fetchAllStations() {
      var url = 'http://localhost:3000/api/stations';

      return $http.get(url)
        .then(function getStationsSuccess(response) {
          stations = response.data;
          return stations;
        })
        .catch(function getStationsError(error) {
          console.log('XHR error for getStations');
          $q.reject();
        });
    }

    function fetchStationById(id) {
      var url = 'http://localhost:3000/api/stations/' + id;

      return $http.get(url)
        .then(function getStationSuccess(response) {
          var fetchedStation = response.data;
          for (var i = 0; i < stations.length; i++) {
            var station = stations[i];
            if(station.id === id ) {
              // If data has changed
              if( isFetchedStationDifferent(station, fetchedStation) ) {
                angular.extend(station, fetchedStation);
                return true;
              }
              else {
                return false;
              }

              break;
            }
          }
        })
        .catch(function getStationError(error) {
          console.log('XHR error for getStationById');
          $q.reject();
        });
    }

    // Check if the data returned for a station is different from the current station
    function isFetchedStationDifferent(station, fetchedStation) {
      return station.attachs !==  fetchedStation.attachs ||
        station.bikes !==  fetchedStation.bikes ||
        station.status !==  fetchedStation.status;
    }
  });
