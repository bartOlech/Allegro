const request = require('request');
const mongoose = require('mongoose');
const tokenData = require('../model/tokenData');

module.exports.generate = (req, res) => {
// connect to database
mongoose.connect(process.env.MONGO_AUTH, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(console.log('MongoDB conected')).catch(err => console.log(err))
mongoose.Promise = global.Promise;

  const clientId = process.env.CLIENT_ID;
  const secretKey = process.env.SECRET_KEY;
  const url = `https://allegro.pl/auth/oauth/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:8080/getToken`;
  const auth = "Basic " + new Buffer(clientId + ":" + secretKey).toString("base64");



  request(
    {
        url : url,
        headers : {
            "Authorization" : auth
        }
    },
    function (error, response, body) {
      tokenData.find({}, function(err, tokens) {
        tokenData.findOneAndUpdate({'_id': tokens[0]._id}, { refreshToken: JSON.parse(body).refresh_token }, {upsert: true}, function(err, doc) {
          console.log('\x1b[36m%s\x1b[0m', 'Refresh token has been updated');
        });
      });
      res.send(body)
    }
  );
}