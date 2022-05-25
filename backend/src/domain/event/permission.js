const ErrorHandler = require('../../infra/utils/errorHandler');
const { Event } = require('../../infra/database/models');
const Moralis = require('../../infra/utils/moralis');
const moralisInstance = new Moralis();

function setRead({
  eventOwner,
  viewer,
  eventPermission,
  viewerAddress,
  eventNFT,
}) {
  if (eventPermission === 'public') {
    return true;
  }
  if (eventPermission === 'unlisted') {
    return true;
  }
  if (eventPermission === 'token-gated') {
    return moralisInstance.verifyOwnership(
      viewerAddress,
      eventNFT && eventNFT.contractAddress,
    );
  }
  return eventOwner.toString() === viewer.toString();
}

function setEdit({ eventOwner, viewer }) {
  if (!eventOwner || !viewer) {
    return false;
  }
  return eventOwner.toString() === viewer.toString();
}

async function permission({ uuid, userId, address }) {
  const event = await Event.findOne({ uuid });
  if (!event) {
    return ErrorHandler.throwError({
      code: 404,
      message: 'Cannot find the event by this uuid',
    });
  }
  const permission = {
    read: false,
    edit: false,
    nft: event.nft,
  };
  permission.read = await setRead({
    eventOwner: event.owner,
    viewer: userId,
    eventPermission: event.permission,
    viewerAddress: address,
    eventNFT: event.nft,
  });
  permission.edit = await setEdit({
    eventOwner: event.owner,
    viewer: userId,
    eventPermission: event.permission,
  });
  return permission;
}

module.exports = permission;
