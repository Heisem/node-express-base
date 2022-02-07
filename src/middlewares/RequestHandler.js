const _ = require('lodash');

exports.RequestHandler = (req, _res, next) => {
  req.log.info({
    body: _.get(req, 'body'),
    query: _.get(req, 'query'),
    params: _.get(req, 'params'),
    headers: _.omit(_.get(req, 'headers'), 'authorization'),
  });

  next();
};
