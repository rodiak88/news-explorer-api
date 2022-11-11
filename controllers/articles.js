const Article = require('../models/article');
const { statusCodes } = require('../utils/utils');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

//return all articles
const getAllArticles = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(statusCodes.OK).send({ data: articles }))
    .catch(next);
};

//creates new article and returns it
const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    source,
    link,
    image,
    owner = req.user._id,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(statusCodes.created).send({ data: article }))
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

//deletes  article by id
const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .select('+owner')
    .orFail(() => {
      throw new NotFoundError('Article with specified ID not found.');
    })
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError("Cannot delete other users' saved articles.");
      } else {
        Article.deleteOne(article).then(() =>
          res.status(statusCodes.OK).send({ data: article })
        );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid article ID.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
