const ErrorHandler = require('../../infra/utils/errorHandler');
const { Event } = require('../../infra/database/models');

async function get(uuid) {
  const foundEvent = await Event.findOne({
    uuid,
  });
  if (!foundEvent) {
    return ErrorHandler.throwError({
      code: 404,
      message: 'Cannot find the event by this uuid',
    });
  }
  return foundEvent.safeObject();
}

module.exports = get;
