const { v4: uuidv4 } = require('uuid');
const { Event } = require('../../infra/database/models');
const Livepeer = require('../../infra/utils/livepeer');
const livepeerInstance = new Livepeer();

async function create({ name, description, startsAt, endsAt, nft, owner }) {
  const stream = await livepeerInstance.createStream({ name });
  const uuid = uuidv4();
  const eventData = {
    uuid,
    name,
    description,
    startsAt,
    endsAt,
    owner,
    nft,
    playbackId: stream && stream.playbackId,
    playbackUrl: `https://cdn.livepeer.com/hls/${
      stream && stream.playbackId
    }/index.m3u8`,
    livepeer: stream,
  };
  const savedEvent = await new Event(eventData).save();
  return savedEvent.safeObject();
}

module.exports = create;
