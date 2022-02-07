const Joi = require('joi');

const handler = (req, res) => {
  throw new Error('erere')
  req.log.info({
    message: 'Received payload',
  });

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
