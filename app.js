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
    }else {
      console.log(result)
      var data = result.split(':');
      switch (data[0]) {
        case 'Result':
          printResultsToSTDOUT(data[1], data[2], data[3]);
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
        stake: stake
      });
      break;
    default:
      console.log('Enter a correct bet type');
  }
}

function printResultsToSTDOUT(winningNumber, secondNumber, thirdNumber) {
  process.stdout.write('\n');
  process.stdout.write('Win:' + winningNumber + ":$" + win.getWinDividends(winPlaceStake, winningNumber) + '\n');
  process.stdout.write('Place:' + winningNumber + ":$" + place.getPlaceDivdend(PlaceStake, winningNumber) + '\n');
  process.stdout.write('Place:' + secondNumber + ":$" + place.getPlaceDivdend(PlaceStake, secondNumber) + '\n');
  process.stdout.write('Place:' + thirdNumber + ":$" + place.getPlaceDivdend(PlaceStake, thirdNumber) + '\n');
  process.stdout.write('Exacta:' + winningNumber + "," + secondNumber + ":$" + Exacta.getExactaDividend(exactaStakes, winningNumber, secondNumber) + '\n');
}