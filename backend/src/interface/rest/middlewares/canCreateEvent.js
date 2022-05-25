const ErrorHandler = require('../../../infra/utils/errorHandler');

async function canCreateEvent(req, res, next) {
  const { userId } = req;
  if (userId) {
    next();
  } else {
    return ErrorHandler.throwError({
      code: 401,
      message: `You do not have permission to create this event`,
      req,
    });
  }
}

module.exports = canCreateEvent;
