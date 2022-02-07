const config = require('config');

module.exports = {
  info: {
    swagger: '2.0',
    version: '1.0.0',
    title: 'Api Documentation',
    description: 'Documentation',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      name: 'Example team',
    },
    license: {
      name: 'MIT',
    },
  },
  host: config.get('HOST'),
  basePath: '/',
  documentationPath: '/documentation',
};
