const UserModel = require('../models/user.model');

class UserService {
  constructor() {
    this.User = UserModel;
  }

  getAll() {
    return this.User.find({}).lean(true).select('username gender email');
  }

  getOne(options, withPassword = true) {
    let query = this.User.findOne(options).lean(true);
    if (!withPassword) return query.select("-password");
    return query;
  }

  addNew(fields) { //{email, password, username, gender}
    let newUser = new this.User(fields);
    return newUser.save();
  }
}

module.exports = new UserService();