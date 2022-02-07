const { logger } = require('../shared');

exports.Logger = (req, res, next) => {
  logger(req, res);

  next();
};
