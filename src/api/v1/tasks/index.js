const { Router } = require('express');

const { Validate } = require('../../../lib/joi-to-swagger');
const Create = require('./create');

const router = Router();

router.post('/', Validate(Create.validator), Create.handler);

module.exports = router;
