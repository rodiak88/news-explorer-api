const { JWT_SECRET = 'dev-secret-key' } = process.env;
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});

const statusCodes = {
  error: 500,
  conflict: 409,
  forbidden: 403,
  notFound: 404,
  badRequest: 400,
  unauthorized: 401,
  created: 201,
  OK: 200,
};

const mongoServer = 'mongodb://localhost:27017/newsdb';

module.exports = {
  statusCodes,
  mongoServer,
  limiter,
  JWT_SECRET,
};
