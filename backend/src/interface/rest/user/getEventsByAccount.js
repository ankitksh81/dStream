const { Event } = require('../../../domain');
const { validator } = require('../middlewares');
const { Joi, validate } = validator;

const getEventsByAccountValidation = {
  params: Joi.object({
    address: Joi.string().required(),
  }),
};

async function getEventsByAccount(req, res) {
  const { address } = req.params;
  const events = await Event.getByAccount(address);
  res.json({ event: events });
}

module.exports = [validate(getEventsByAccountValidation), getEventsByAccount];
