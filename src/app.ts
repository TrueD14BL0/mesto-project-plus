import express from 'express';
import mongoose from 'mongoose';
import userRouter from './user/user.router';
import cardRouter from './card/card.router';
import { errorCheck } from './utils/error-check';
import { createUser } from './user/user.controller';
import { login } from './login/login.controller';
import { auth } from './auth/auth';
import { requestLogger, errorLogger } from './logger/logger';
import { celebrate, Joi, errors } from "celebrate";

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(requestLogger);

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
      avatar: Joi.string().uri(),
    }),
  }),
  createUser
);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errors());
app.use(errorLogger);
app.use(errorCheck);

app.listen(PORT, () => {
    console.log(`Server start normally. App listening on port ${PORT}`)
})
