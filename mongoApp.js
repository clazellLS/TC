var mongoose = require('mongoose');
var WinModel = require('./models/winSchema.js');
var PlaceModel = require('./models/placeSchema.js');
var ExactaModel = require('./models/exactaSchema.js');

var win = require('./libs/Win.js');
var place = require('./libs/Place.js');
var Exacta = require('./libs/Exacta.js');
var inputVal = require('./libs/input.js');

mongoose.connect('mongodb://tc:tctote@ds059712.mongolab.com:59712/tote');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Conntecion to db');
});
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (line) {

  inputVal.validate(line, function (err, result) {
    if (err) {
      return console.error(err);
    } else {
      var data = result.split(':');
      switch (data[0]) {
        case 'Result':
          getResults(data, function (err, res) {
            if (err) return console.error(err);
            if (res) {
              exitAndDropCollection('Wins');
              exitAndDropCollection('places');
              exitAndDropCollection('exactas');
            }
          });
          break;
        case 'Bet':
          placeBet(data[1], data[3], data[2]);
          break;
        default:
          throw new Error('Enter a real value');
      }
    }
  })


});

function getResults(data) {
  process.stdout.write('\n');
  WinModel.find({ 'betType': 'W' }, 'selection stake', function (err, allBets) {
    if (err) return console.error(err);
    win.getWinDividends(allBets, data[1], function (err, result) {
      process.stdout.write('Win:' + data[1] + ":$" + result + '\n');
    })
  })
  PlaceModel.find({ 'betType': 'P' }, 'selection stake', function (err, allBets) {
    if (err) return console.error(err);
    place.getPlaceDivdend(allBets, data[1], function (err, result) {
      process.stdout.write('Place:' + data[1] + ":$" + result + '\n');
    })
    place.getPlaceDivdend(allBets, data[2], function (err, result) {
      process.stdout.write('Place:' + data[2] + ":$" + result + '\n');
    })
    place.getPlaceDivdend(allBets, parseInt(data[3]), function (err, result) {
      process.stdout.write('Place:' + parseInt(data[3]) + ":$" + result + '\n');
    })
  })
  ExactaModel.find({ 'betType': 'E' }, 'selectionOne selectionTwo stake', function (err, allBets) {
    if (err) return console.error(err);
      Exacta.getExactaDividend(allBets, data[1] , data[2], function (err, result) {
        process.stdout.write('Exacta:' + data[1] + "," + data[2] + ":$" + result + '\n');
      })
  })
  return true;
}
function placeBet(betType, stake, selection) {
  switch (betType) {
    case 'W':
      var bet = new WinModel({ betType: betType, selection: parseInt(selection), stake: parseInt(stake) });
      bet.save(function (err) {
        if (err) return console.error(err);
      });
      break;
    case 'P':
      var place = new PlaceModel({ betType: betType, selection: parseInt(selection), stake: parseInt(stake) });
      place.save(function (err) {
        if (err) return console.error(err);
      });
      break;
    case 'E':
      var horses = selection.split(',');
      var exacta = new ExactaModel({ betType: betType, selectionOne: parseInt(horses[0]), selectionTwo: parseInt(horses[1]), stake: parseInt(stake) });
      exacta.save(function (err) {
        if (err) return console.error(err);
      });
      break;
    default:
      throw new Error('Enter a proper selection');
  }
}
function exitAndDropCollection(collection) {
  mongoose.connection.db.dropCollection(collection, function (err, result) {
    if (err) return console.error(err);
    process.exit()
  });
}
