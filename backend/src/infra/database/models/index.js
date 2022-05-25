require('../');

const _models = {
  Account: require('./schema/account').model,
  Event: require('./schema/event').model,
};

module.exports = _models;
