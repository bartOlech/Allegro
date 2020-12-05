const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const allegroConnector = require('../controllers/allegroConnector');

router.get('/', homeController.home);
router.get('/allegroApi', allegroConnector.get);

module.exports = router;