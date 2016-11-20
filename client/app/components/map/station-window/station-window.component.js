var StationWindowComponent = {
  templateUrl: 'app/components/map/station-window/station-window.html',
  controller: 'StationWindowController',
  bindings: {
    selectedStation: '<'
  }
};

angular
  .module('station-window')
  .component('stationWindow', StationWindowComponent);
