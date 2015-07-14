exports.getPlaceDivdend = function (winArray, horseNumber,next) {
  var pool = winArray.filter(function (value) {
    return value.selection == horseNumber;
  }).reduce(addStakes, 0);
  var totalPool = winArray.reduce(addStakes, 0);
  var newPlacePool = getPoolAfterCommission(totalPool, 12) / 3;
  next(null, (newPlacePool / pool).toFixed(2));
}

function addStakes(previusValue, currentobject) {
  return previusValue + currentobject.stake;
}

function getPoolAfterCommission(pool, commisionPercent) {
  return pool - ((pool / 100) * commisionPercent)
}