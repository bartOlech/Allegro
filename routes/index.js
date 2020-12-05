const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const allegroConnector = require('../controllers/allegroConnector');
const allegroRequestController = require('../controllers/allegroRequestController');
const refreshTokenController = require('../controllers/refreshTokenController');
const generateToken = require('../controllers/generateToken');

router.get('/', homeController.home);
router.get('/connectToAllegro', allegroConnector.get);
router.get('/allegroRequest', refreshTokenController.refresh, allegroRequestController.get);
// /refreshToken is using ALWAYS with /allegroRequest (middleware)
router.get('/refreshToken', refreshTokenController.refresh);
router.get('/getToken', generateToken.generate);

module.exports = router;