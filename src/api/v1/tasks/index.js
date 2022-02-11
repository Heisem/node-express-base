const { Router } = require('express');

const { Validate } = require('../../../lib/joi-to-swagger');
const Create = require('./create');
const Get = require('./get');

const router = Router();

router.post('/', Validate(Create.validator), Create.handler);
router.get('/:id', Validate(Get.validator), Get.handler);

module.exports = router;
