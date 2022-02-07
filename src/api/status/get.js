const Joi = require('joi');

const validator = {
  headers: Joi.object(),
};

validator.group = 'Status';
validator.description = 'Health status';

const handler = (_req, res) => {
  return res.json({
    status: 'ok',
  });
};

module.exports = {
  handler,
  validator,
};
