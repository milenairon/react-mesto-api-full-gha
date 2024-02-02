require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
// Если запрос не проходит описанную валидацию,
// celebrate передаст его дальше - в обработчик ошибки
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
// Заголовки безопасности проставляются автоматически(безопасность)
const helmet = require('helmet');
// const cors = require('cors');

const app = express();

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
// const limiter = require('./middlewares/rateLimiter');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/handleErrors');
const { DB_ADDRESS } = require('./config');

// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000',
//       'https://milenairon.nomoredomainsmonster.ru',
//     ],
//     credentials: true,
//     maxAge: 30,
//   }),
// );

app.use(helmet());
app.use(cookieParser());
// app.use(limiter);

// Подключаемся к серверу Mongo
mongoose.connect(DB_ADDRESS);

// Сборка пакетов
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// подключаем логгер запросов
app.use(requestLogger);

// подключаем логгер запросов
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Регистрация
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      ),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

// Аутентификация
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cards'));

// подключаем логгер ошибок
app.use(errorLogger);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// Обработчик ошибок celebrate
app.use(errors());

// Централизованная обработка ошибок
app.use(handleErrors);

app.listen(PORT);
