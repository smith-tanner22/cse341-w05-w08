const express = require('express');
const router = express.Router();

router.use('/toDo', require('./toDo'));

module.exports = router;
