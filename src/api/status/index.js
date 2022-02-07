const { Router } = require('express');

const { Validate } = require('../../lib/joi-to-swagger');
const getStatus = require('./get');

const router = Router();

router.get('/', Validate(getStatus.validator), getStatus.handler);

module.exports = router;
