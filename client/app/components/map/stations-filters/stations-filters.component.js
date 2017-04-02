angular
  .module('stations-filters')
  .component('stationsFilters', {
    templateUrl: 'app/components/map/stations-filters/stations-filters.html',
    bindings: {
      filters: '<',
      onChange: '&'
    }
  });
