const { Router } = require('express');

const { Validate } = require('../../../lib/joi-to-swagger');
const Test = require('./test');

const router = Router();

router.post('/test', Validate(Test.validator), Test.handler);

module.exports = router;
