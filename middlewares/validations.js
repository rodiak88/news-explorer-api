const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'The "name" field must be longer than 2 characters.',
      'string.max': 'The "name" field must be shorter than 30 characters.',
      'string.empty': 'The "name" field cannot be empty.',
    }),
    email: Joi.string()
      .required()
      .email()
      .message('The "email" field must be a valid email address.')
      .messages({
        'string.empty': 'The "email" field cannot be empty.',
      }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'The "password" field must be longer than 8 caharcters',
      'string.empty': 'The "password" field cannot be empty.',
    }),
  }),
});

const validateAddArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The "keyword" field must be longer than 2 characters.',
      'string.max': 'The "keyword" field must be shorter than 30 characters.',
      'string.empty': 'The "keyword" field cannot be empty.',
    }),
    title: Joi.string().required().messages({
      'string.empty': 'The "title" field cannot be empty.',
    }),
    text: Joi.string().required().messages({
      'string.empty': 'The "text" field cannot be empty.',
    }),
    source: Joi.string().required().messages({
      'string.empty': 'The "source" field cannot be empty.',
    }),
    link: Joi.string()
      .required()
      .custom(validateUrl)
      .message('The "link" field must be a valid URL.')
      .messages({
        'string.empty': 'The "link" field cannot be empty',
      }),
    image: Joi.string()
      .required()
      .custom(validateUrl)
      .message('The "image" field must be a valid URL.')
      .messages({
        'string.empty': 'The "image" field cannot be empty',
      }),
  }),
});

const validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('The "email" field must be a valid email address.')
      .messages({
        'string.empty': 'The "email" field cannot be empty.',
      }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field cannot be empty.',
    }),
  }),
});

const validateObjectId = (value, helpers) => {
  if (ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message('Invalid ID.');
};

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().custom(validateObjectId),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validateObjectId),
  }),
});

module.exports = {
  validateAddArticle,
  validateUserId,
  validateArticleId,
  validateUserAuth,
  validateUserSignup,
};
