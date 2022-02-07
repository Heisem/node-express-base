const express = require('express');
const config = require('config');
const pino = require('pino-http');
const cors = require('cors');

const { Doc, ErrorHandler } = require('./lib/joi-to-swagger');
const v1 = require('./api/v1/routes');

const app = express();
const logger = pino();

app.use(logger)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_req, res, next) => {
  const originalJSON = res.json;

  res.json = function () {
    const [data, meta, ...rest] = arguments
    const response = { data, meta: meta || {} }
    originalJSON.apply(res, [response, ...rest])
  }

  next();
})

app.use('/api/v1', v1);

app.use(ErrorHandler);

app.listen(config.get('PORT'), () => {
  Doc(app, require('./swagger.config'));
});
