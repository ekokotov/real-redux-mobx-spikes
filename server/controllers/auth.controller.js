const UserService = require('../services/user.service'),
  jwtConfig = require('../configs/jwt'),
  jwt = require('jsonwebtoken'),
  _pick = require('lodash/pick'),
  Joi = require('joi'),
  bcrypt = require('bcrypt');

class AuthController {

  static _getTokenFromRequest(req) {
    if (req.headers.authorization) {
      let auth = req.headers.authorization.split(' ');
      if (auth[0] === 'Bearer') {
        return auth[1];
      } else return req.query.token;
    } else return null;
  }

  checkJWTSession(req, res, next) {
    let user, token = AuthController._getTokenFromRequest(req);
    if (!token) return res.status(403).json({error: 'No token found.'});

    user = jwt.verify(token, jwtConfig.secretKey);
    if (!user) return res.status(403).json({error: 'No token found.'});

    req.user = user;
    next();
  }

  async login(req, res) {
    let {email, password} = req.body;
    try {
      const user = await UserService.getOne({email});
      if (!user) return res.status(404).json({error: 'User is not exists.'});

      if (bcrypt.compareSync(password, user.password)) {
        return res.json({
          token: AuthController._generateJWTToken(user),
          user: _pick(user, ['username', 'gender', 'email'])
        });
      } else return res.status(404).json({error: 'Password is wrong.'});

    } catch (error) {
      return res.status(500).json({error: 'Can\'t login the user. Internal Error.'});
    }
  }

  async signUp(req, res) {
    let {email, password, username, gender} = req.body,
      user, token;
    try {
      user = await UserService.addNew({email, password, username, gender});
      token = AuthController._generateJWTToken(user.toJSON());
      return res.status(201).json({user, token});
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate username
        return res.status(500).send({error: 'User already exist!'});
      } else return res.status(500).json({error: error.message});
    }
  }

  _signUpValidation() {
    return {
      body: {
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        gender: Joi.string().valid('male', 'female'),
        email: Joi.string().email()
      }
    }
  }

  _loginValidation() {
    return {
      body: {
        email: Joi.string().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
      }
    }
  }

  static _generateJWTToken(user) {
    return jwt.sign(JSON.stringify(_pick(user, ['email', 'gender', 'username'])), jwtConfig.secretKey);
  }
}


module.exports = new AuthController();