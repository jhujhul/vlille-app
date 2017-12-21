angular
  .module("map")
  .component("map", {
    templateUrl: "app/components/map/map.html",
    controller: "MapController",
    bindings: {
      stations: "<"
    }
  })
  .config(function($stateProvider) {
    var MapState = {
      name: "map",
      url: "/map",
      component: "map",
      resolve: {
        /* @ngInject */
        stations: function(StationsService) {
          return StationsService.fetchAllStations();
        }
      }
    };

    $stateProvider.state(MapState);
  });
