const { Router } = require('express');

const Test = require('./test');

const router = Router();
router.use('/', Test);

module.exports = router;