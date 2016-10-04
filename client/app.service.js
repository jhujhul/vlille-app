angular
  .module('app')
  .factory('AppService', function AppService ($http, $q) {
    var service = {
      getAllStations: getAllStations
    };

    return service;

    function getAllStations() {
      var url = 'http://localhost:3000/stations';

      return $http.get(url)
        .then(function getStationsSuccess(response) {
          return response.data;
        })
        .catch(function getStationsError(error) {
          console.log('XHR error for getStations');
          $q.reject();
        });
    }
  });
