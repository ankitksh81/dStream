const mongoose = require('mongoose');
const { Schema } = mongoose;

const NFTSchema = new Schema(
  {
    name: { type: String },
    contractAddress: { type: String },
    contractType: { type: String },
    image: { type: String },
  },
  { _id: 0 },
);

const _event = {};

_event.schema = new Schema(
  {
    uuid: { type: String },
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    startsAt: { type: Date },
    endsAt: { type: Date },
    permission: {
      type: String,
      enum: ['public', 'private', 'unlisted', 'token-gated'],
      default: 'public',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'accounts',
    },
    playbackId: { type: String },
    playbackUrl: { type: String },
    livepeer: { type: Schema.Types.Mixed },
    nft: { type: NFTSchema },

    // system generated
    createdAt: { type: Number, required: true, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
  },
  { usePushEach: true },
  { runSettersOnQuery: true },
);

_event.schema.pre('save', function (next) {
  const event = this;
  if (event.nft) {
    event.permission = 'token-gated';
  }
  event.updatedAt = Date.now();
  next();
});

_event.schema.methods.safeObject = function () {
  const safeFields = [
    '_id',
    'uuid',
    'name',
    'description',
    'startsAt',
    'endsAt',
    'playbackId',
    'playbackUrl',
    'permission',
    'owner',
    'nft',
    'createdAt',
  ];
  const newSafeObject = {};
  safeFields.forEach((elem) => {
    // eslint-disable-next-line security/detect-object-injection
    newSafeObject[elem] = this[elem];
  });
  return newSafeObject;
};

_event.model = mongoose.model('events', _event.schema);

module.exports = _event;
