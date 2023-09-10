import express from 'express';
import mongoose from 'mongoose';
import userRouter from './user/user.router';
import cardRouter from './card/card.router';
//import NotFoundError from './Errors/NotFoundError';
//import { RESOURSE_NOT_FOUND } from './utils/errorConstants';
import { errorCheck } from './utils/errorCheck';

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу MongoiDB
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// подключаем мидлвары, роуты и всё остальное...
app.use(express.json());

app.use((req:express.Request, res: express.Response, next) => {
  req.user = {
    _id: '64bec5c3cf008c44a7bc1c52'
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
//app.use('/', () =>{throw new NotFoundError(RESOURSE_NOT_FOUND);} );

app.use(errorCheck);

app.listen(PORT, () => {
    console.log(`Server start normally. App listening on port ${PORT}`)
})