var express = require('express');
var router = express.Router();

// bring in the travel controller
var controller = require('../controllers/travel');

/* GET travel page. */
router.get('/', controller.travel);

module.exports = router;
