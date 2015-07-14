exports.getWinDividends = function (winArray, winningHorse,next) {
  var totalPool = winArray.filter(function (value) {
    return value.selection == winningHorse;
  }).reduce(addStakes, 0);
  var pool = winArray.reduce(addStakes, 0);
  next(null, (getPoolAfterCommission(pool, 15) / totalPool).toFixed(2));
}

function addStakes(previusValue, currentobject) {
  return previusValue + currentobject.stake;
}

function getPoolAfterCommission(pool, commisionPercent) {
  return pool - ((pool / 100) * commisionPercent)
}