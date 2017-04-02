angular
  .module('app')
  .factory('StationsService', StationsService);

function StationsService($http, $q, config) {
  var stations = [];

  var service = {
    fetchAllStations: fetchAllStations,
    getStationById: getStationById
  };

  return service;

  function fetchAllStations() {
    var url = config.API_SERVER_BASEURL + '/stations';

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

  function getStationById(id) {
    for (var i = 0; i < stations.length; i++) {
      if(stations[i].id === id) {
        return stations[i];
      }
    }
    return {};
  }
}
