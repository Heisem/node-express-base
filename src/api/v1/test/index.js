const { Router } = require('express');
const Joi = require('joi');

const { Validate } = require('../../../lib/joi-to-swagger');
const { Test } = require('./test');

const router = Router();
const schema = Joi.object({
  query: Joi.object({
    test: Joi.string().required(),
  }).required().unknown(),
}).unknown()

router.get('/test', Validate(schema), Test);

module.exports = router;
