angular
  .module('stations-markers')
  .controller('StationsMarkersController', StationsMarkersController);

function StationsMarkersController() {
  var ctrl = this;

  ctrl.$onInit = function() {
  };

  ctrl.onMarkerClick = function(marker, eventName, model, arguments) {
    ctrl.onStationSelected({id: marker.key});
  };
}
