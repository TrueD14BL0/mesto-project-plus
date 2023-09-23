import express from "express";
import { INCORRECT_DATA, INCORRECT_DATA_MESSAGE, SERVER_ERROR } from "./error-constants";

export const errorCheck = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  let { message } = err;
  let statusCode = SERVER_ERROR;

  if(err.name === 'ValidationError'){
    statusCode = INCORRECT_DATA;
    message = INCORRECT_DATA_MESSAGE;
  }

  res
  .status(statusCode)
  .send({
    message: statusCode === SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message
  });

  next();
}