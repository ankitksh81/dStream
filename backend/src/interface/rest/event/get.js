const { Event } = require('../../../domain');
const { validator } = require('../middlewares');
const { Joi, validate } = validator;

const getValidation = {
  params: Joi.object({
    uuid: Joi.string().required(),
  }),
};

async function get(req, res) {
  const { uuid } = req.params;
  const event = await Event.get(uuid);
  res.json(event);
}

module.exports = [validate(getValidation), get];
