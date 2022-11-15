const {
  JWT_SECRET = 'dev-secret-key',
  MONGO_DB = 'mongodb://localhost:27017/newsdb',
  PORT = 3000,
} = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_DB,
  PORT,
};
