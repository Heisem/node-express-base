exports.CreatePayloadHandler = (_req, res, next) => {
  const originalJSON = res.json;

  res.json = function () {
    const [data, meta, ...rest] = arguments
    const response = { data, meta: meta || {} }
    originalJSON.apply(res, [response, ...rest])
  }

  next();
};
