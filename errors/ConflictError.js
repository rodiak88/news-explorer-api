const { statusCodes } = require('../utils/utils');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.conflict;
  }
}

module.exports = ConflictError;
