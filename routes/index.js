const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const allegroConnector = require('../controllers/allegroConnector');
const getQuotes = require('../controllers/getQuotes');
const generateToken = require('../controllers/generateToken');

router.get('/', homeController.home);
router.get('/connectToAllegro', allegroConnector.get);
router.get('/offerPricing', getQuotes.refresh);
router.get('/getToken', generateToken.generate);

module.exports = router;