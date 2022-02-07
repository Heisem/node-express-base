const Joi = require('joi');
const Boom = require('boom');
const Extend = require('extend');
const _ = require('lodash');

module.exports = function validate(schema, options) {
  options = options || {};

  return function validateRequest(req, res, next) {
    // this is way to to return joi schema without validation
    // we return this in the express server when we want to create auto doc
    if(req === 'schemaBypass') {
      return schema;
    }

    if (!schema) {
      return next();
    }

    const validateSchema = _.pick(schema, ['params', 'body', 'query', 'headers']);
    let requestToValidate = _.pick(req, ['params', 'body', 'query', 'headers']);
    requestToValidate = Object.entries(requestToValidate).reduce((acc, [key, value]) => {
      if (!_.isEmpty(value)) acc[key] = value;
      return acc;
    } , {});

    const result = Joi.object(validateSchema).validate(requestToValidate, options);

    if (result.error) {
      throw Boom.badRequest(result.error.details.map(d => d.message).join(' and '));
    }

    // copy the validated data to the req object
    // Extend(req, result.value);
    return next();
  }
};