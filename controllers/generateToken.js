const request = require('request');
const mongoose = require('mongoose');
const tokenData = require('../model/tokenData');

module.exports.generate = (req, res) => {

  const clientId = "10e9c976d5754063a103e6c8938edd9a";
  const secretKey = "ZqW6TjprKcxaJv3DibgjyPVSma2GkzFRX6H7bNTvTtE1TKrcoW22kJfZqBYKUTXp";
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
        res.send(body)
    }
  );
}