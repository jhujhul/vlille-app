var StationsFiltersComponent = {
  templateUrl: 'app/components/map/stations-filters/stations-filters.html',
  bindings: {
    filters: '<',
    onChange: '&'
  }
};

angular
  .module('stations-filters')
  .component('stationsFilters', StationsFiltersComponent);
