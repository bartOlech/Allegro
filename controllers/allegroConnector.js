const request = require('request');


module.exports.get = (req, res) => {
  request.post('https://allegro.pl/auth/oauth/authorize?response_type=code&client_id=bc078c63df614c0999e81961ba42230e&redirect_uri=https://allegro-cudny-app.herokuapp.com/', function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    res.send(body)
  });
}


