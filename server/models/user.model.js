// The User model
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

const userSchema = new Schema({
  id: Schema.ObjectId,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: {
      unique: true
    }
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);