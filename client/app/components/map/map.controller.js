angular
  .module('map')
  .controller('MapController', MapController);

function MapController(StationsService, uiGmapIsReady, $rootScope) {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.filters = {
      avaibleBikes: false,
      avaibleStations: false
    };
    ctrl.selectedStation= {};
    ctrl.stationsMarkers = getMarkersList();

    ctrl.map = {
      center: {
        latitude: 50.637222,
        longitude: 3.09
      },
      zoom: 17,
      control: {},
      options: {
        mapTypeControl: false,
        streetViewControl: false
      },
      window: {
        show: false,
        marker: {}
      }
    };
  };

  // uiGmapIsReady.promise(1).then(function(instances) {
  //   console.log('gmap ready !');
  // });

  function getMarkersList() {
    var newStationsMarkers = [];

    angular.forEach(ctrl.stations, function(station) {
      if(displayStation(station)) {
        var marker = {
          id: station.id,
          latitude: station.latitude,
          longitude: station.longitude,
          label: station.name
        };

        newStationsMarkers.push(marker);
      }
    });

    return newStationsMarkers;
  }

  ctrl.refreshMarkersList = function() {
    ctrl.stationsMarkers = getMarkersList();
  };

  function displayStation(station) {
    if( ctrl.filters.avaibleBikes && !station.bikes
        || ctrl.filters.avaibleStations && !station.attachs
        || station.id === ctrl.selectedStation.id ) {
      return false;
    }

    return true;
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    ctrl.map.control.refresh({latitude: position.coords.latitude, longitude: position.coords.longitude});
  }, function() {
    console.log('Cannot get current position');
  });

  ctrl.selectStation = function(id) {
    ctrl.selectedStation = StationsService.getStationById(id);
    ctrl.refreshMarkersList();
  };

  ctrl.deleteSelectedStation = function() {
    ctrl.selectedStation = {};
    ctrl.refreshMarkersList();
  };

  $rootScope.$on('refreshStation', function(event, data) {
    StationsService.fetchStationById(ctrl.selectedStation.id)
      .then(function(station) {
        ctrl.selectedStation = station;
      });
  });
}
