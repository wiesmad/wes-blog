const express = require('express');
const router = express.Router();

const { login } = require('../controllers/authController');

router.get('/', (req, res) => {
  res.render('authorization/login');
});

router.post('/', login);

module.exports = router;
