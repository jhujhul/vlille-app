angular
  .module('app', [
    'uiGmapgoogle-maps'
  ])
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyA6gr3zDRveuD-4BrFq5VzKcNS6bTRVofo',
        v: '3.25', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
  });
