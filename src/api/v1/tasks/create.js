const Joi = require('joi');
const { Tasks } = require('../../../models/Tasks');

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

const handler = async (req, res) => {
  var tasks = new Tasks();
  const r = await tasks.create(req.body);

  return res.status(201).json(r);
};

module.exports = {
  handler,
  validator,
};
