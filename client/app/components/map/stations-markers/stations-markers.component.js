angular
  .module('stations-markers')
  .component('stationsMarkers', {
    templateUrl: 'app/components/map/stations-markers/stations-markers.html',
    bindings: {
      markers: '<',
      onStationSelected: '&'
    },
    controller: 'StationsMarkersController'
  });
