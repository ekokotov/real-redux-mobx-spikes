const express = require('express'),
  router = express.Router(),
  AuthController = require('../controllers/auth.controller'),
  validate = require('express-joi-validator');

router.post('/login', validate(AuthController._loginValidation), AuthController.login);
router.post('/signup', validate(AuthController._signUpValidation), AuthController.signUp);

module.exports = router;
