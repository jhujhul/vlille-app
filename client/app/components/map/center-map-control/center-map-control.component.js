angular
  .module('center-map-control')
  .component('centerMapControl', {
    templateUrl: 'app/components/map/center-map-control/center-map-control.html',
    bindings: {
      onClick: '&'
    }
  });
