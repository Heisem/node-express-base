const Joi = require('joi');

const handler = (_req, res) => {
  return res.json({
    status: 'ok',
  });
};

const validator = {
  headers: Joi.object(),
};

validator.group = 'Status';
validator.description = 'Health status';

module.exports = {
  handler,
  validator,
};
