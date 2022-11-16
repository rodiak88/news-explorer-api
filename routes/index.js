const router = require('express').Router();
const {
  validateUserAuth,
  validateUserSignup,
} = require('../middlewares/validations');
const userRouter = require('./users');
const articleRouter = require('./articles');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateUserAuth, login);
router.post('/signup', validateUserSignup, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

router.use(() => {
  throw new NotFoundError('Requested resource not found.');
});

module.exports = router;
