import MyError from "../Errors/MyError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/constants";

export const auth = (req: Request, res: Response, next: NextFunction) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return MyError.IncorrectLoginError();
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
  } catch (err) {
    return MyError.IncorrectLoginError();
  }
  req.user = {_id: payload._id};
  next();

}
