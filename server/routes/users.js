const express = require('express'),
  router = express.Router(),
  validate = require('express-joi-validator'),

  UserController = require('../controllers/user.controller'),
  AuthController = require('../controllers/auth.controller');

const privateRoute = AuthController.checkJWTSession;

router.get('/', privateRoute, UserController.getAll);

router.get(
  '/:id',
  validate(UserController._validateUserId()),
  privateRoute,
  UserController.getOne);

module.exports = router;