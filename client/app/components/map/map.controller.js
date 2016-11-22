function MapController(AppService, uiGmapIsReady) {
  var ctrl = this;

  ctrl.$onInit = function() {
    console.log(ctrl.stations);
    ctrl.stationsMarkers = [];
    ctrl.selectedStation= {};

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
      events: {
        dragend: ctrl.getInBoundsStationsData,
        zoom_changed: ctrl.getInBoundsStationsData
      },
      window: {
        show: false,
        marker: {}
      }
    };

    ctrl.filters = {
      avaibleBikes: false,
      avaibleStations: false
    };

    ctrl.refreshMarkersList();
  };

  uiGmapIsReady.promise(1).then(function(instances) {
      console.log("gmap ready !");
      ctrl.getInBoundsStationsData();
  });

  ctrl.refreshMarkersList = function() {
    ctrl.stations = AppService.getAllStations();
    ctrl.stationsMarkers = [];

    angular.forEach(ctrl.stations, function(station) {
      if(displayStation(station)) {
        var marker = {
          id: station.id,
          latitude: station.latitude,
          longitude: station.longitude,
          label: station.name
        };

        ctrl.stationsMarkers.push(marker);
      }
    });
  }

  function displayStation(station) {
    if(ctrl.filters.avaibleBikes && !station.bikes) {
      return false;
    }

    if(ctrl.filters.avaibleStations && !station.attachs) {
      return false;
    }

    return true;
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    ctrl.map.control.refresh({latitude: position.coords.latitude, longitude: position.coords.longitude});

    console.log(position);

    ctrl.getInBoundsStationsData();
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });

  ctrl.getInBoundsStationsData = function() {
    var bounds = ctrl.map.control.getGMap().getBounds();

    for (var i = 0; i < ctrl.stations.length; i++){
      var station = ctrl.stations[i];
      if( isStationInBounds(station, bounds) ) {
        AppService.fetchStationById(station.id)
          .then(function(stationDataHasChanged) {
            if(stationDataHasChanged) {
              ctrl.refreshMarkersList();
            }
          });
      }
    }
  }

  function isStationInBounds(station, bounds) {
    return station.latitude > bounds.f.f &&
      station.latitude < bounds.f.b &&
      station.longitude > bounds.b.b &&
      station.longitude < bounds.b.f;
  }

  ctrl.onMarkerClick = function (marker, eventName, model, arguments) {
    ctrl.selectedStation = AppService.getStationById(marker.key);
  };

  ctrl.deleteSelectedStation = function() {
    ctrl.selectedStation = {};
  };
}

angular
  .module('map')
  .controller('MapController', MapController);
