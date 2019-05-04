const UserModel = require('../models/user.model');

class UserService {
  getAll(limit) {
    return UserModel.find({}).limit(limit).lean(true).select('username gender email');
  }

  getOne(options, withPassword = true) {
    let query = UserModel.findOne(options).lean(true);
    if (!withPassword) return query.select("-password");
    return query;
  }

  addNew(fields) { //{email, password, username, gender}
    let newUser = new UserModel(fields);
    return newUser.save();
  }
}

module.exports = new UserService();
