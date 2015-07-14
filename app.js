process.stdin.resume();
process.stdin.setEncoding('utf8');

var win = require('./libs/Win.js');
var place = require('./libs/Place.js');
var Exacta = require('./libs/Exacta.js');
var inputVal = require('./libs/input.js');

var winPlaceStake = [];
var PlaceStake = [];
var exactaStakes = [];

process.stdin.on('data', function (line) {
  getInputType(line);
});

function getInputType(line) {
  inputVal.validate(line, function (err, result) {
    if (err) {
      return console.error(err);
    } else {
      var data = result.split(':');
      switch (data[0]) {
        case 'Result':
          printResultsToSTDOUT(parseInt(data[1]), parseInt(data[2]), parseInt(data[3]));
           process.exit()
          break;
        case 'Bet':
          placeBet(data[1], data[3], data[2]);
          break;
      }
    }
  })
}

function placeBet(betType, stake, selection) {
  switch (betType) {
    case 'W':
      winPlaceStake.push({
        selection: selection,
        stake: inputVal.validateAndParseInt(stake)
      });
      break;
    case 'P':
      PlaceStake.push({
        selection: selection,
        stake: inputVal.validateAndParseInt(stake)
      });
      break;
    case 'E':
      var horses = selection.split(',');
      exactaStakes.push({
        selectionOne: horses[0],
        selectionTwo: horses[1],
        stake: inputVal.validateAndParseInt(stake)
      });
      break;
    default:
      console.log('Enter a correct bet type');
  }
}

function printResultsToSTDOUT(winningNumber, secondNumber, thirdNumber) {
  process.stdout.write('\n');
  win.getWinDividends(winPlaceStake, winningNumber, function (err, result) {
    process.stdout.write('Win:' + winningNumber + ":$" + result + '\n');
  })
  place.getPlaceDivdend(PlaceStake, winningNumber, function (err, result) {
    process.stdout.write('Place:' + winningNumber + ":$" + result + '\n');
  })
  place.getPlaceDivdend(PlaceStake, secondNumber, function (err, result) {
    process.stdout.write('Place:' + secondNumber + ":$" + result + '\n');
  })
  place.getPlaceDivdend(PlaceStake, thirdNumber, function (err, result) {
    process.stdout.write('Place:' + thirdNumber + ":$" + result + '\n');
  })
  Exacta.getExactaDividend(exactaStakes, winningNumber, secondNumber, function (err, result) {
    process.stdout.write('Exacta:' + winningNumber + "," + secondNumber + ":$" + result + '\n');
  })
}