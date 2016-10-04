angular
  .module('app')
  .controller('AppController', function AppController(AppService) {
    var ctrl = this;

    ctrl.$onInit = function() {
      AppService.getAllStations()
        .then(function(stations) {
          console.log(stations);
          ctrl.stations = stations;
        });
    };

    ctrl.title = 'Stations vlille'
  });
