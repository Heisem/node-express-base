const express = require('express');
const config = require('config');
const cors = require('cors');
const _ = require('lodash');

const { Doc } = require('./lib/joi-to-swagger');
const {
  ErrorHandler,
  RequestHandler,
  CreatePayloadHandler,
  Logger,
} = require('./middlewares');
const v1 = require('./api/v1/routes');
const status = require('./api/status');

const app = express();

app.use(Logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(CreatePayloadHandler);
app.use(RequestHandler);

app.use('/status', status);
app.use('/api/v1', v1);

app.use(ErrorHandler);

app.listen(config.get('PORT'), () => {
  Doc(app, require('./swagger.config'));
});
