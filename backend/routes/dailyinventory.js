var express = require('express');
var router = express.Router();
var dailyInventoryController = require('../controllers/dailyinventoryController');

router.get('/vue', dailyInventoryController.getSum);

module.exports = router;