angular
  .module('app')
  .factory('StationsService', StationsService);
  
function StationsService($http, $q) {
  var service = {
    fetchAllStations: fetchAllStations
  };

  return service;

  function fetchAllStations() {
    var url = 'http://localhost:3000/api/stations';

    return $http.get(url)
        .then(function getStationsSuccess(response) {
          stations = response.data;
          return stations;
        })
        .catch(function getStationsError(error) {
          console.log('XHR error for getStations');
          $q.reject(error.data);
        });
  }
}
