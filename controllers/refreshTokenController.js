const request = require('request');
const mongoose = require('mongoose');
const tokenData = require('../model/tokenData');

module.exports.refresh = (req, res, next) => {
  // connect to database
  mongoose.connect(process.env.MONGO_AUTH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(console.log('MongoDB conected')).catch(err => console.log(err))
  mongoose.Promise = global.Promise;

  // Get refresh token from database
  tokenData.find({}, (err, tokens) => {
    const clientId = process.env.CLIENT_ID;
    const secretKey = process.env.SECRET_KEY;
    const url = `https://allegro.pl/auth/oauth/token?grant_type=refresh_token&refresh_token=${tokens[0].refreshToken}`;
    const auth = "Basic " + new Buffer(clientId + ":" + secretKey).toString("base64");
  
    request(
      {
          url : url,
          headers : {
              "Authorization" : auth
          }
      },
      (error, response, body) => {
        tokenData.find({}, (err, tokens) => {
          tokenData.findOneAndUpdate({'_id': tokens[0]._id}, { refreshToken: JSON.parse(body).refresh_token }, {upsert: true}, (err, doc) => {
            console.log('\x1b[36m%s\x1b[0m', 'Refresh token has been updated');
          });
        });

        req.accessToken = JSON.parse(body).access_token;
        next();
      }
    )
  })
}