angular
  .module('station-window')
  .controller('StationWindowController', StationWindowController);

function StationWindowController() {
  var ctrl = this;

  ctrl.$onInit = function() {
  };

  ctrl.getLastUpdateInMinutes = function() {
    console.log('ctrl.selectedStation.lastUpdate', ctrl.selectedStation.lastUpdate)
    return getDateDifferenceInMinutes(new Date(), new Date(ctrl.selectedStation.lastUpdate));
  };

  function getDateDifferenceInMinutes(date1, date2) {
    var difference = date1 - date2;

    console.log('difference', difference)

    return difference / ( 1000 * 60 );
  }
}
