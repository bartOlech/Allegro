const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  refreshToken: {
    type: String
  },
})

const TokenData = mongoose.model('token', dataSchema, 'token');
module.exports = TokenData;