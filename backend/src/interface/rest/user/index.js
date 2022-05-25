const {
  asyncHandler,
  asyncHandlerArray,
} = require('../../../infra/utils/asyncHandler');
const express = require('express');
const router = express.Router();

// domain
const login = require('./login');
const getAccount = require('./getAccount');
const editAccount = require('./editAccount');
const getEventsByAccount = require('./getEventsByAccount');
const getNFTByAccount = require('./getNFTByAccount');

// middlewares
const { canViewAccount, canEditAccount } = require('../middlewares');

router.post('/:address/login', asyncHandlerArray(login));
router.get(
  '/:address',
  asyncHandler(canViewAccount),
  asyncHandlerArray(getAccount),
);
router.post(
  '/:address/edit',
  asyncHandler(canEditAccount),
  asyncHandlerArray(editAccount),
);
router.get(
  '/:address/all',
  asyncHandler(canEditAccount),
  asyncHandlerArray(getEventsByAccount),
);
router.get(
  '/:address/nfts',
  asyncHandler(canEditAccount),
  asyncHandlerArray(getNFTByAccount),
);

module.exports = router;
