const UserService = require('../services/user.service');

let Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

class UserController {
  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({error: 'Internal Error'});
    }
  }

  async getOne(req, res) {
    let {id} = req.params;
    try {
      const user = await UserService.getOne({_id: id}, false);
      return res.json(user);
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: 'Internal Error'});
    }
  }

  async add(req, res) {
    const {email, password, username, gender} = req.body;
    const newUser = {
      email,
      password,
      username,
      gender
    };

    try {
      return res.json(await UserService.addNew(newUser));
    } catch (error) {
      return res.status(500).json({error: 'Internal Error'});
    }
  }

  _validateUserId() {
    return {
      params: {
        id: Joi.objectId().required()
      }
    }
  }

}

module.exports = new UserController();