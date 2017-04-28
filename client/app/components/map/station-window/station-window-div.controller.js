angular
  .module('station-window')
  .controller('StationWindowDivController', StationWindowDivController);

function StationWindowDivController($rootScope) {
  var ctrl = this;

  ctrl.refreshStation = function() {
    $rootScope.$broadcast('refreshStation');
  };
}
