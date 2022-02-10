const pino = require('pino-http');
const { v4: uuid } = require('uuid');

const { logger } = require('../shared');

exports.Logger = pino({
  logger,
  genReqId(_req) {
    return uuid();
  },
  redact: ['body.password', 'req.headers.authorization'],
});
