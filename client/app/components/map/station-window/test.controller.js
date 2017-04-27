angular
  .module('station-window')
  .controller('StationWindowDivController', StationWindowDivController);

function StationWindowDivController($scope) {
  // $scope.title = "MIAOU"
  $scope.showInfo = function() {
    console.log('HOURRA')
  };
}
