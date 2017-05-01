angular
  .module('station-window')
  .filter('timeElapsed', timeElapsed);

function timeElapsed () {
  return function (isoDate) {
    var date = new Date(isoDate);
    var now = new Date();

    return getDateDifferenceInMinutes(now, date);
  };

  function getDateDifferenceInMinutes(date1, date2) {
    var difference = date1 - date2;

    return Math.ceil(difference / (1000 * 60));
  }
}
