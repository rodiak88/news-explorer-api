const router = require('express').Router();
const { getUser, getCurrentUser } = require('../controllers/users');

const { validateUserId } = require('../middlewares/validations');

router.get('/me', getCurrentUser);

router.get('/:userId', validateUserId, getUser);

module.exports = router;
