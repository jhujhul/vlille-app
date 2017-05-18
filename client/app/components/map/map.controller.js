angular.module('map').controller('MapController', MapController);

function MapController(
  StationsService,
  uiGmapIsReady,
  $rootScope,
  $interval,
  $scope
) {
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
      },
      events: {
        click: handleMapClick
      }
    };

    ctrl.geolocationAvailable = !!navigator.geolocation;
  };

  // Use to fix bug where, when a station was selected and user clicked on a map location
  // the former selected station marker would not show on the map
  function handleMapClick(map, eventName, args) {
    // If user clicked on location, refresh markers list
    if (args[0].placeId) {
      ctrl.deleteSelectedStation();
      // A bit ugly, but the marker of the former selected station would not show
      // or only after user moved map, or click on map
      $scope.$apply();
    }
  }

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

  function centerMap(lat, lng) {
    ctrl.map.control.refresh({ latitude: lat, longitude: lng });
  }

  $interval(function() {
    getUserPosition(false);
  }, 30 * 1000);

  function getUserPosition(doCenterMap) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        ctrl.userPosition = position;
        ctrl.refreshMarkersList();
        if (doCenterMap) {
          centerMap(
            ctrl.userPosition.coords.latitude,
            ctrl.userPosition.coords.longitude
          );
        }
      },
      function() {
        console.log('Cannot get current position');
      }
    );
  }

  ctrl.centerMapOnUser = function() {
    if (ctrl.userPosition) {
      centerMap(
        ctrl.userPosition.coords.latitude,
        ctrl.userPosition.coords.longitude
      );
    } else if (ctrl.geolocationAvailable) {
      getUserPosition(true);
    }
  };

  ctrl.selectStation = function(id) {
    ctrl.selectedStation = StationsService.getStationById(id);
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

  // Fetch station list every 3 minutes
  $interval(refreshStationsList, 3 * 60 * 1000);

  function refreshStationsList() {
    StationsService.fetchAllStations().then(function(stations) {
      ctrl.stations = stations;
    });
  }
}
