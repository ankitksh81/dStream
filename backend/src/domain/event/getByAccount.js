const { Event, Account } = require('../../infra/database/models');

async function getByAccount(address) {
  const account = await Account.findOne({ address });
  const foundEvents = await Event.find({
    owner: account._id,
  })
    .sort({ _id: -1 })
    .lean();
  return foundEvents;
}

module.exports = getByAccount;
