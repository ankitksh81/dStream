const ErrorHandler = require('../../../infra/utils/errorHandler');
const { Event } = require('../../../domain');

async function canViewEvent(req, res, next) {
  const { uuid } = req.params;
  const { userId, address } = req;
  const permission = await Event.permission({ uuid, userId, address });
  if (permission.read) {
    next();
  } else {
    let statusCode = 403;
    if (!userId) {
      statusCode = 401;
    }
    if (!permission.nft) {
      return ErrorHandler.throwError({
        code: statusCode,
        message: `You do not have permission to view this event: ${uuid}`,
        req,
      });
    }
    return ErrorHandler.throwError({
      code: statusCode,
      message: `You need to have atleast one ${
        permission.nft && permission.nft.name
      } NFT`,
      req,
    });
  }
}

module.exports = canViewEvent;
