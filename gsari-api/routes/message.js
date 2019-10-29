const express = require('express');

const { checkAuth } = require('../middleware/auth');
const {
  all,
  create,
} = require('../controllers/messages');

const router = express.Router();

router.get('/topic/:id/messages', all);

router.post('/topic/:id/message', checkAuth, create);

module.exports = router;
