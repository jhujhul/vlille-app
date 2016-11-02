angular
  .module('app')
  .factory('AppService', function AppService ($http, $q) {
    var service = {
      getAllStations: getAllStations,
      getStationById: getStationById
    };

    return service;

    function getAllStations() {
      var url = 'http://localhost:3000/api/stations';

      return $http.get(url)
        .then(function getStationsSuccess(response) {
          return response.data;
        })
        .catch(function getStationsError(error) {
          console.log('XHR error for getStations');
          $q.reject();
        });
    }

    function getStationById(id) {
      var url = 'http://localhost:3000/api/stations/' + id;

      return $http.get(url)
        .then(function getStationSuccess(response) {
          return response.data;
        })
        .catch(function getStationError(error) {
          console.log('XHR error for getStationById');
          $q.reject();
        });
    }
  });
