const request = require('request');

module.exports.get = (req, res) => {
  const url = `https://api.allegro.pl/billing/billing-entries`;
  const auth = `Bearer ${req.accessToken}`;

  request(
    {
        url : url,
        headers : {
            "Authorization" : auth,
            "accept": "application/vnd.allegro.public.v1+json"
        }
    },
    (error, response, body) => {
        res.send(body)
    }
  );
}