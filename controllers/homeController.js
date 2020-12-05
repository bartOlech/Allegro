const request = require('request');
const mongoose = require('mongoose');
const tokenData = require('../model/tokenData');

module.exports.home = (req, res) => {
 // connect to database
 mongoose.connect('mongodb+srv://olechbartlomiej:Forhuta123@quizapp.mpygt.mongodb.net/allegro?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(console.log('MongoDB conected')).catch(err => console.log(err))
  mongoose.Promise = global.Promise;

  tokenData.find({}, function(err, tokens) {
    console.log(tokens[0].refreshToken)
  });

  const info = {
    "/connectToAllegro": "Tutaj mozemy utworzyć nowy token (jeśli po 3 msc wyczerpie się refresh token)",
    "/allegroRequest": "Wszystkie zapytania do Allegro",
    "/refreshToken": "Uruchamiane z kazdym zapytaniem, odswieza token i zapisuje nowy w bazie (refresh token takze nowy)",
    "/generateToken": "middleware po /connectToAllegro, tworzy nowy token"
  }
  res.send(info)
}