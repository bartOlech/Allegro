
module.exports.get = (req, res) => {
  res.redirect('https://allegro.pl/auth/oauth/authorize?response_type=code&client_id=10e9c976d5754063a103e6c8938edd9a&redirect_uri=http://localhost:8080/getToken');
}