const express = require('express');
const router = express.Router();

const user = require('./user');
const event = require('./event');

router.use('/account', user);
router.use('/event', event);

module.exports = router;
