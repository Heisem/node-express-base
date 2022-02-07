const { Router } = require('express');

const Tasks = require('./tasks');

const router = Router();

router.use('/tasks', Tasks);

module.exports = router;
