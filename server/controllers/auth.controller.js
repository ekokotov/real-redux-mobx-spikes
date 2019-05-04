const UserService = require('../services/user.service'),
    jwtConfig = require('../configs/jwt'),
    jwt = require('jsonwebtoken'),
    _pick = require('lodash/pick'),
    Joi = require('joi'),
    bcrypt = require('bcrypt');

class AuthController {
    _generateTokenAndReturnSafeUserInfo = user => {
        if (!user) throw 'User is empty';
        return {
            token: this._generateJWTToken(user),
            user: _pick(user, ['username', 'gender', 'email'])
        }
    };

    _getTokenFromRequest(req) {
        if (req.headers.authorization) {
            let auth = req.headers.authorization.split(' ');
            if (auth[0] === 'Bearer') {
                return auth[1];
            } else return req.query.token;
        } else return null;
    }

    checkJWTSession = (req, res, next) => {
        let user, token = this._getTokenFromRequest(req);
        if (!token) return res.status(403).json({error: 'No token found.'});

        user = jwt.verify(token, jwtConfig.secretKey);
        if (!user) return res.status(403).json({error: 'No token found.'});

        req.user = user;
        next();
    };

    login = async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await UserService.getOne({email});
            if (!user) return res.status(404).json({error: 'User is not exists.'});

            if (bcrypt.compareSync(password, user.password)) {
                return res.status(201).json(this._generateTokenAndReturnSafeUserInfo(user));
            } else return res.status(404).json({error: 'Password is wrong.'});

        } catch (error) {
            console.error(error);
            return res.status(500).json({error: 'Can\'t login the user. Internal Error.'});
        }
    };

    signUp = async (req, res) => {
        const {email, password, username, gender} = req.body;
        try {
            let user = await UserService.addNew({email, password, username, gender});
            return res.status(201).json(this._generateTokenAndReturnSafeUserInfo(user));
        } catch (error) {
            console.error(error);
            if (error.code === 11000) {
                // Duplicate user
                return res.status(500).send({error: 'User already exist!'});
            } else return res.status(500).json({error: error.message});
        }
    };

    _signUpValidation = {
        body: {
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
            gender: Joi.string().valid('male', 'female'),
            email: Joi.string().email()
        }
    };

    _loginValidation = {
        body: {
            email: Joi.string().email(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        }
    };

    _generateJWTToken(user) {
        return jwt.sign(JSON.stringify(_pick(user, ['email', 'gender', 'username'])), jwtConfig.secretKey);
    }
}


module.exports = new AuthController();
