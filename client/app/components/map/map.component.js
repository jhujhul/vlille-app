var MapComponent = {
  templateUrl: 'app/components/map/map.html',
  controller: 'MapController',
  bindings: {
    stations: '<'
  }
};

angular
  .module('map')
  .component('map', MapComponent)
  .config(function($stateProvider) {
    var MapState = {
      name: 'map',
      url: '/map',
      component: 'map',
      resolve: {
        stations: function(AppService) {
          return AppService.fetchAllStations();
        }
      }
    };

    $stateProvider.state(MapState);
  });
