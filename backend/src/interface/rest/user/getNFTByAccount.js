const { NFT } = require('../../../domain');
const { validator } = require('../middlewares');
const { Joi, validate } = validator;

const getNFTByAccountValidation = {
  params: Joi.object({
    address: Joi.string().required(),
  }),
};

async function getNFTByAccount(req, res) {
  const { address } = req.params;
  const nft = await NFT.getByAccount(address);
  res.json({ nft });
}

module.exports = [validate(getNFTByAccountValidation), getNFTByAccount];
