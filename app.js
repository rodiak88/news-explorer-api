const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongoServer, limiter } = require('./utils/utils');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());

mongoose.connect(mongoServer);

app.use(express.json());

app.use(requestLogger);

app.use(cors());
app.options('*', cors());

app.use(routes);
app.use(limiter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
