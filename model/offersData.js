const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offersSchema = new Schema({
  type: {
    type: String
  },
  offerId: {
    type: String
  },
})

const TokenData = mongoose.model('OffersId', offersSchema, 'OffersId');
module.exports = TokenData;