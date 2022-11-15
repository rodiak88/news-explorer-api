const express = require('express');
require('dotenv').config({ path: './.env' });
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DB, PORT } = require('./utils/config');
const limiter = require('./middlewares/limiter');

const app = express();
app.use(helmet());

mongoose.connect(MONGO_DB);

app.use(express.json());

app.use(requestLogger);

app.use(cors());
app.options('*', cors());
app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
