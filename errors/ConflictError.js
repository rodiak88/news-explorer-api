const { statusCodes } = require('../utils/consts');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.conflict;
  }
}

module.exports = ConflictError;
