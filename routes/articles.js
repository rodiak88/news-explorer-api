const router = require('express').Router();
const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const {
  validateAddArticle,
  validateArticleId,
} = require('../middlewares/validations');

router.get('/', getAllArticles);
router.post('/', validateAddArticle, createArticle);
router.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = router;
