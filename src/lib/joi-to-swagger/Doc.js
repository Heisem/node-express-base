const SwaggerBase = require('../swagger-json');
const SwaggerUi = require('swagger-ui-express');
const fs = require('fs');
const { regexpToPath } = require('./helper');

const swaggerDoc = SwaggerBase.swaggerDoc;

exports.Doc = (app, settings) => {
  const { info, host, basePath, documentationPath } = settings;

  swaggerDoc.createJsonDoc(info, host, basePath);

  app._router.stack.forEach((middleware) => {
      
    function deepRoute(middleware, accPath = '') {
      if (middleware.route) {
        // routes registered directly on the app
        const { path, stack } = middleware.route;
        if (path) {
          stack.forEach((routeMehtod) => {
            if (routeMehtod.name == 'validateRequest') {
              const joiSchema = routeMehtod.handle('schemaBypass');
              swaggerDoc.addNewRoute(joiSchema, accPath + path, routeMehtod.method);
            }
          });
        }
      } else if (middleware.name === 'router') {
          for (let i = 0; i < middleware.handle.stack.length; i++) {
            deepRoute(middleware.handle.stack[i], accPath + regexpToPath(middleware.regexp));
          }
      }
    }

    deepRoute(middleware);
  });

  const swaggerDocument = fs.readFileSync('./swagger.json', 'utf8');

  let docPath = documentationPath || '/';

  var options = {
    explorer: false,
    swaggerOptions: {
      withCredentials: true,
    },
  };

  app.use(docPath, SwaggerUi.serve, SwaggerUi.setup(JSON.parse(swaggerDocument), options)
  );
};
