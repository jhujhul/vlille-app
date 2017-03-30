function StationWindowController() {
  var ctrl = this;

  ctrl.$onInit = function() {
    console.log('onInit');
    console.log('selectedStation', ctrl.selectedStation);
  };

  ctrl.$onChanges = function(changesObj) {
    console.log('changesObj', changesObj);
  };
}

angular
  .module('station-window')
  .controller('StationWindowController', StationWindowController);
