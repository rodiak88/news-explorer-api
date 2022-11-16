const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = mongoose.Schema({
  keyword: {
    type: String,
    required: [true, "The 'keyword' field is required."],
  },
  title: {
    type: String,
    required: [true, "The 'name' field is required."],
  },
  text: {
    type: String,
    required: [true, "The 'text' field is required."],
  },
  date: {
    type: String,
    required: [true, "The 'date' field is required."],
  },
  source: {
    type: String,
    required: [true, "The 'source' field is required."],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Article link must be a valid URL.',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Article image link must be a valid URL.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
