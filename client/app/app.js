angular
  .module('app', [
    'components',
    'uiGmapgoogle-maps',
    'ui.router'
    // 'config'
  ])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyA6gr3zDRveuD-4BrFq5VzKcNS6bTRVofo',
      v: '3', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  })
  .config(function($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/map');
  });
