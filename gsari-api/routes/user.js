const express = require('express');

const router = express.Router();

const { userRegister, userLogin } = require('../controllers/users');

router.post('/user/register', userRegister);

router.post('/user/login', userLogin);

module.exports = router;
