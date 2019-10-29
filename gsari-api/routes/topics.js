const express = require('express');

const { checkAuth } = require('../middleware/auth');
const {
  all,
  create,
  update,
  remove,
} = require('../controllers/topics');

const router = express.Router();

router.get('/topics', all);

router.post('/topic', checkAuth, create);

router.patch('/topic/:id', checkAuth, update);

router.delete('/topic/:id', checkAuth, remove);

module.exports = router;
