exports.getExactaDividend = function (exactaArray, winningNumber, secondNumber) {
  var exwin = exactaArray.filter(function (value) {
    return value.selectionOne == winningNumber && value.selectionTwo == secondNumber;
  }).reduce(addStakes, 0);
  var pool = exactaArray.reduce(addStakes, 0);
  return (getPoolAfterCommission(pool, 18) / exwin).toFixed(2);
}

function addStakes(previusValue, currentobject) {
  return previusValue + currentobject.stake;
}

function getPoolAfterCommission(pool, commisionPercent) {
  return pool - ((pool / 100) * commisionPercent)
}