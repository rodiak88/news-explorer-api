const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Invalid email address.',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [8, 'The password field must be longer than 8 caharcters'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'User name is required.'],
    minLength: [2, "The 'name' field must be longer than 2 characters."],
    maxLength: [30, "The 'name' field must be shorter than 30 characters."],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password.'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password.'));
        }

        return user.toJSON();
      });
    });
};

userSchema.methods.toJSON = function toJSON() {
  const { password, ...userObj } = this.toObject();
  return userObj;
};

module.exports = mongoose.model('user', userSchema);
