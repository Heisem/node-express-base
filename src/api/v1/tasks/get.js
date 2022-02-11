const Joi = require('joi');
const { Tasks } = require('../../../models/Tasks');

const validator = {
  params: Joi.object({
    id: Joi.string().required(),
  }).required(),
  headers: Joi.object(),
  response: {
    id: Joi.string().guid(),
    name: Joi.string().example('task name'),
  }
}

validator.model = 'get_task';
validator.group = 'Tasks';
validator.description = 'Get Task';
validator.responseModel = 'get_task_response';

const handler = async (req, res) => {
  var tasks = new Tasks();
  const r = await tasks.get(req.params.id);

  return res.json(r);
};

module.exports = {
  handler,
  validator,
};
