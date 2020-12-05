const request = require('request');


module.exports.get = (req, res) => {
  request.post('https://allegro.pl/auth/oauth/authorize?response_type=code&client_id=10e9c976d5754063a103e6c8938edd9a&redirect_uri=http://localhost:8080', function (error, response, body) {
    console.error('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });
}


