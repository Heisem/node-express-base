const Joi = require('joi');

const handler = (req, res) => {
  return res.json(req.body);
};

const validator = Joi.object({
  body: Joi.object({
    test: Joi.string().required(),
  }).required(),
}).unknown();

module.exports = {
  handler,
  validator,
};
