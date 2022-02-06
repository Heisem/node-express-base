const express = require('express');

const joi = require('joi');
const { Doc, Validate, RequestHandler } = require('./lib/joi-to-swagger');
const routes = require('./api/v1/routes');

const app = express();
app.use(express.json());

const schema = {
    body: {
        test: joi.string().required()
    },
}

// Note middleware here
app.post('/register', Validate(schema), (req, res) => {
    res.json({
        message: 'register'
    });
});

app.use('/api/v1', routes);

app.use(RequestHandler);

app.listen(3000, () => {
    Doc(app, require('./settings'));
})