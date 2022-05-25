const { Event } = require('../../../domain');
const { validator } = require('../middlewares');
const { Joi, validate } = validator;

const createValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    startsAt: Joi.date().optional(),
    endsAt: Joi.date().optional(),
    nft: Joi.object({
      contractAddress: Joi.string().required(),
      contractType: Joi.string().required(),
      name: Joi.string().required(),
      image: Joi.string().required(),
    }).optional(),
  }),
};

async function create(req, res) {
  const { name, description, startsAt, endsAt, nft } = req.body;
  const createdEvent = await Event.create({
    name,
    description,
    startsAt,
    endsAt,
    nft,
    owner: req.userId,
  });
  res.json(createdEvent);
}

module.exports = [validate(createValidation), create];
