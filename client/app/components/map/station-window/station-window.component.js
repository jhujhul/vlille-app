var StationWindowComponent = {
  templateUrl: 'app/components/map/station-window/station-window.html',
  controller: 'StationWindowController',
  bindings: {
    selectedStation: '<',
    onCloseClick: '&'
  }
};

angular
  .module('station-window')
  .component('stationWindow', StationWindowComponent);
