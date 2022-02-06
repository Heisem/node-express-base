
const SwaggerBase = require('../swagger-json');
const SwaggerUi = require('swagger-ui-express');
const fs = require('fs');
const { regexpToPath } = require('./helper');

const swaggerDoc = SwaggerBase.swaggerDoc;

exports.Doc = (app, settings) => {
    const {info, host, basePath, documentationPath} = settings;

    swaggerDoc.createJsonDoc(info, host, basePath);

    app._router.stack.forEach((middleware) => {
        if (middleware.route) { // routes registered directly on the app
            const { path, stack } = middleware.route;
            if (path) {
                stack.forEach((routeMehtod) => {
                    if (routeMehtod.name == 'validateRequest') {
                        const joiSchema = routeMehtod.handle('schemaBypass');
                        swaggerDoc.addNewRoute(joiSchema, path, routeMehtod.method)
                    }
                })
            }
        } else if (middleware.name === 'router' && middleware.handle.stack) { // router middleware)
            function deepRoute(middleware, accPath) {
                middleware.handle.stack.forEach((handler) => {
                    if (middleware.name === 'router' && middleware.handle.stack) {
                        if (middleware.handle.stack[0].handle.stack) {
                            deepRoute(middleware.handle.stack[0], regexpToPath(middleware.regexp))
                        }
                    }

                    if(!handler.route) {
                        return;
                    }

                    const { path, stack } = handler.route;
                    console.log(path)
                    if (path) {
                        stack.forEach((routeMehtod) => {
                            if (routeMehtod.name == 'validateRequest') {
                                const joiSchema = routeMehtod.handle('schemaBypass');
                                swaggerDoc.addNewRoute(joiSchema, accPath + regexpToPath(middleware.regexp) + path, routeMehtod.method)
                            }
                        })
                    }
                });
            }

            deepRoute(middleware);
        }
    });

    const swaggerDocument = fs.readFileSync('./swagger.json', 'utf8');

    let docPath = documentationPath || '/';

    app.use(docPath, SwaggerUi.serve, SwaggerUi.setup(JSON.parse(swaggerDocument)));
}
