angular.module("app").factory("StationsService", StationsService);

function StationsService($http, $q) {
  var stations = [];
  var API_SERVER_BASEURL =
    "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime";

  var service = {
    fetchAllStations: fetchAllStations,
    fetchStationById: fetchStationById,
    getStationById: getStationById
  };

  return service;

  function fetchAllStations() {
    var url = API_SERVER_BASEURL + "&rows=300";

    return $http
      .get(url)
      .then(function getStationsSuccess(response) {
        stations = response.data.records.map(parseApiStation);
        return stations;
      })
      .catch(function getStationsError(error) {
        console.log("XHR error for getStations");
        $q.reject(error.data);
      });
  }

  function fetchStationById(id) {
    var url = API_SERVER_BASEURL + "&rows=1&q=libelle=" + id;

    return $http
      .get(url)
      .then(function getStationSuccess(response) {
        var station = parseApiStation(response.data.records[0]);
        updateStation(id, station);

        return station;
      })
      .catch(function getStationError(error) {
        console.log("XHR error for getStation");
        $q.reject(error.data);
      });
  }

  function getStationById(id) {
    for (var i = 0; i < stations.length; i++) {
      if (stations[i].id === id) {
        return stations[i];
      }
    }
    return {};
  }

  function updateStation(id, station) {
    for (var i = 0; i < stations.length; i++) {
      if (stations[i].id === id) {
        stations[i] = station;
        return;
      }
    }
  }

  function parseApiStation(station) {
    return {
      id: station.fields.libelle,
      name: parseApiNom(station.fields.nom),
      latitude: station.fields.geo[0],
      longitude: station.fields.geo[1],
      adress: station.fields.adresse,
      isOutOfService:
        station.fields.etat !== "EN SERVICE" ||
        station.fields.etatConnexion !== "CONNECTEE",
      bikes: station.fields.nbVelosDispo,
      attachs: station.fields.nbPlacesDispo,
      hasCreditCardTerminal: station.fields.type === "AVEC TPE",
      lastUpdate: station.record_timestamp
    };
  }

  // Parse station name sent by the api
  // The format of the name is:
  // id + realName + (CB) (if station has credit card)
  // ie: '66 Delesalle Mediatheque' or '27 Tanneurs (CB)'
  function parseApiNom(nom) {
    return nom
      .split(" ")
      .filter(function(part, index) {
        return index > 0 && part !== "(CB)";
      })
      .join(" ");
  }
}
