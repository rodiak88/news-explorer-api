require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, statusCodes } = require('../utils/utils');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

//returns user information by passed id
const getUserData = (id, res, next) => {
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('User with specified ID not found.');
    })
    .then((user) => {
      res.status(statusCodes.OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid user ID.'));
      } else {
        next(err);
      }
    });
};

//return data of user with selected id
const getUser = (req, res, next) => {
  getUserData(req.params.userId, res, next);
};

//return data of curret logged in user
const getCurrentUser = (req, res, next) => {
  getUserData(req.user._id, res, next);
};

//signup
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          'A user with the provided email already exists.'
        );
      } else {
        return bcrypt.hash(password, 13);
      }
    })
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
      })
    )
    .then((user) =>
      res.status(statusCodes.created).send({ data: user.toJSON() })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(' ')}`
          )
        );
      } else {
        next(err);
      }
    });
};

//signin
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.status(statusCodes.OK).send({ data: user, token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

module.exports = {
  getUser,
  getCurrentUser,
  createUser,
  login,
};
