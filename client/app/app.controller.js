angular
  .module('app')
  .controller('AppController', function AppController(AppService) {
    var ctrl = this;

    ctrl.$onInit = function() {
      // ctrl.filter = 'all';
      // ctrl.stationsMarkers = [];
      // ctrl.stations = [];
      //
      // AppService.getAllStations()
      //   .then(function(stations) {
      //     console.log(stations);
      //     ctrl.stations = stations;
      //
      //     angular.forEach(ctrl.stations, function(station) {
      //       var marker = {
      //         id: station.id,
      //         latitude: station.lat,
      //         longitude: station.lng,
      //         label: station.name
      //       };
      //
      //       ctrl.stationsMarkers.push(marker);
      //     });
      //     console.log('stationsMarkers', ctrl.stationsMarkers);
      //   });
    };

    // ctrl.filterMarkers = function() {
    //   var newMarkersList = [];
    //   console.log('ctrl.filter', ctrl.filter);
    //   switch(ctrl.filter) {
    //     case 'all':
    //       angular.forEach(ctrl.stations, function(station) {
    //         var marker = {
    //           id: station.id,
    //           latitude: station.lat,
    //           longitude: station.lng,
    //           label: station.name
    //         };
    //
    //         newMarkersList.push(marker);
    //       });
    //       break;
    //     case 'velo':
    //       angular.forEach(ctrl.stations, function(station) {
    //         if(station.bikes) {
    //           var marker = {
    //             id: station.id,
    //             latitude: station.lat,
    //             longitude: station.lng,
    //             label: station.name
    //           };
    //
    //           newMarkersList.push(marker);
    //         }
    //       });
    //       break;
    //     case 'station':
    //       angular.forEach(ctrl.stations, function(station) {
    //         if(station.attachs) {
    //           var marker = {
    //             id: station.id,
    //             latitude: station.lat,
    //             longitude: station.lng,
    //             label: station.name
    //           };
    //
    //           newMarkersList.push(marker);
    //         }
    //       });
    //       break;
    //   }
    //
    //   ctrl.stationsMarkers = newMarkersList;
    // };
    //
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   // var pos = {
    //   //   lat: position.coords.latitude,
    //   //   lng: position.coords.longitude
    //   // };
    //
    //   // ctrl.map.center = {
    //   //   latitude: position.coords.latitude,
    //   //   longitude: position.coords.longitude
    //   // };
    //   // ctrl.map.center.longitude = position.coords.longitude
    //
    //   ctrl.map.control.refresh({latitude: position.coords.latitude, longitude: position.coords.longitude});
    //
    //   // getInfosFromStationLessThan500meters
    //
    //   console.log(position);
    //
    //   // ctrl.stationsMarkers = []
    //
    //
    // }, function() {
    //   handleLocationError(true, infoWindow, map.getCenter());
    // });
    //
    // ctrl.title = 'Stations vlille';
    //
    // ctrl.map = {
    //   center: {
    //     latitude: 50.637222,
    //     longitude: 3.09
    //   },
    //   zoom: 15,
    //   control: {}
    // };
    //
    // ctrl.handleClick = function (marker, eventName, model, arguments) {
    //   ctrl.selectedStation = model;
    //
    //   // AppService.getStationById(ctrl.selectedStation.id)
    //   //   .then(function(station) {
    //   //     angular.extend(ctrl.selectedStation, station);
    //   //   });
    // }
  });
