const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../../infra/utils/asyncHandler');
const express = require('express');
const router = express.Router();

// domain
const create = require('./create');
const get = require('./get');
// middlewares
const { canViewEvent, canCreateEvent } = require('../middlewares');

router.post('/create', asyncHandler(canCreateEvent), asyncHandlerArray(create));
router.get('/:uuid', asyncHandler(canViewEvent), asyncHandlerArray(get));

module.exports = router;
