const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/toDo', requiresAuth(), require('./toDo'));
router.use('/user', requiresAuth(), require('./user'));

module.exports = router;
