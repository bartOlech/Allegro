
module.exports.home = (req, res) => {

  const info = {
    "/connectToAllegro": "Tutaj mozemy utworzyć nowy token (jeśli po 3 msc wyczerpie się refresh token)",
    "/allegroRequest": "Wszystkie zapytania do Allegro",
    "/refreshToken": "Uruchamiane z kazdym zapytaniem, odswieza token i zapisuje nowy w bazie (refresh token takze nowy)",
    "/generateToken": "middleware po /connectToAllegro, tworzy nowy token"
  }
}