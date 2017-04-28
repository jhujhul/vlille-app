angular
  .module('app')
  .factory('StationsService', StationsService);

function StationsService($http, $q, config) {
  var stations = [];

  var service = {
    fetchAllStations: fetchAllStations,
    fetchStationById: fetchStationById,
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

  function fetchStationById(id) {
    var url = config.API_SERVER_BASEURL + '/stations/' + id;

    return $http.get(url)
      .then(function getStationSuccess(response) {
        var station = response.data;
        updateStation(id, station);

        return station;
      })
      .catch(function getStationError(error) {
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

  function updateStation(id, station) {
    for (var i = 0; i < stations.length; i++) {
      if (stations[i].id === id) {
        stations[i] = station;
        return;
      }
    }
  }
}
