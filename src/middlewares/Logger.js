const pino = require('pino-http');
const { v4: uuid } = require('uuid');
const config = require('config');

const { logger } = require('../shared');

exports.Logger = pino({
  logger,
  genReqId(_req) {
    return uuid();
  },
  serializers: {
    req(req) {
      req.body = req.raw.body;
      return req;
    },
  },
  redact: config.get('logger.redact'),
});
