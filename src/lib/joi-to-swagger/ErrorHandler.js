const Boom = require('boom');

exports.ErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    if (!err.data || err.data.length === 0 || !err.data[0].message) {
        return res.status(err.output.statusCode).json(err.output.payload);
    }
    const payload = {
        ...err.output.payload,
        message: err.data[0].message
    }
    return res.status(err.output.statusCode).json(payload);
  }

  const e = Boom.internal().output

  if (res.log) res.log.error(err);

  return res.status(e.statusCode).json(e.payload);
};
