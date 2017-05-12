angular.module('map').controller('MapController', MapController);

function MapController(StationsService, uiGmapIsReady, $rootScope, $interval) {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.filters = {
      avaibleBikes: false,
      avaibleStations: false
    };
    ctrl.selectedStation = {};
    ctrl.userPosition = null;
    ctrl.stationsMarkers = getMarkersList();

    ctrl.map = {
      // Opéra de Lille
      center: {
        latitude: 50.637522,
        longitude: 3.065183
      },
      zoom: 16,
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
      if (displayStation(station)) {
        var marker = {
          id: station.id,
          latitude: station.latitude,
          longitude: station.longitude,
          label: station.name
        };

        newStationsMarkers.push(marker);
      }
    });

    if (ctrl.userPosition) {
      console.log('ctrl.userPosition', ctrl.userPosition);
      var userMarker = {
        id: 'user',
        latitude: ctrl.userPosition.coords.latitude,
        longitude: ctrl.userPosition.coords.longitude,
        icon: {
          url: 'assets/user-location.png',
          anchor: {
            x: 18,
            y: 18
          }
        }
      };

      newStationsMarkers.push(userMarker);
    }

    return newStationsMarkers;
  }

  function displayStation(station) {
    if (
      (ctrl.filters.avaibleBikes && !station.bikes) ||
      (ctrl.filters.avaibleStations && !station.attachs) ||
      station.id === ctrl.selectedStation.id
    ) {
      return false;
    }

    return true;
  }

  ctrl.refreshMarkersList = function() {
    ctrl.stationsMarkers = getMarkersList();
  };

  if (navigator.geolocation) {
    getUserPosition(0);
    $interval(getUserPosition, 30 * 1000);
  }

  function getUserPosition(intervalCount) {
    var firstTimeFunctionIsCalled = intervalCount === 0;

    navigator.geolocation.getCurrentPosition(
      function(position) {
        ctrl.userPosition = position;
        ctrl.refreshMarkersList();
        if (firstTimeFunctionIsCalled) {
          ctrl.centerMapOnUser();
        }
      },
      function() {
        console.log('Cannot get current position');
      }
    );
  }

  function centerMap(lat, lng) {
    ctrl.map.control.refresh({ latitude: lat, longitude: lng });
  }

  ctrl.centerMapOnUser = function() {
    if (ctrl.userPosition) {
      centerMap(
        ctrl.userPosition.coords.latitude,
        ctrl.userPosition.coords.longitude
      );
    }
  };

  ctrl.selectStation = function(id) {
    ctrl.selectedStation = StationsService.getStationById(id);
    console.log('ctrl.selectedStation', ctrl.selectedStation);
    ctrl.refreshMarkersList();
  };

  ctrl.deleteSelectedStation = function() {
    ctrl.selectedStation = {};
    ctrl.refreshMarkersList();
  };

  $rootScope.$on('refreshSelectedStation', function(event, data) {
    StationsService.fetchStationById(ctrl.selectedStation.id).then(function(
      station
    ) {
      ctrl.selectedStation = station;
    });
  });
}
