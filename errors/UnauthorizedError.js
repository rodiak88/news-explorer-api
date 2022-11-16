const { statusCodes } = require('../utils/consts');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.unauthorized;
  }
}

module.exports = UnauthorizedError;
