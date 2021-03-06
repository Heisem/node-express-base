const Joi = require('joi');

const validator = {
  body: Joi.object({
    name: Joi.string().required(),
  }).required(),
  headers: Joi.object(),
  response: {
    id: Joi.string().guid(),
    name: Joi.string().example('task name'),
  }
}

validator.model = 'create_task';
validator.group = 'Tasks';
validator.description = 'Create Task';
validator.responseModel = 'create_task_response';

const handler = (req, res) => {
  return res.status(201).json(req.body);
};

module.exports = {
  handler,
  validator,
};
