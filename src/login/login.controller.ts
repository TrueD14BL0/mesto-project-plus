import { NextFunction, Request, Response } from "express";
import userModel from "../user/user.model";
import MyError from "../Errors/MyError";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/constants";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  userModel.findOne({email:email}).select('+password')
    .then(user=>{
      if(!user){
        throw MyError.IncorrectLoginError();
      }

      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return MyError.IncorrectLoginError();
          }
          const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
          res
          .cookie("token", `Bearer ${token}`, {
            maxAge: 60*60*24*7,
            httpOnly: true})
          .send(user);
        })
        .catch(next);
    })
    .catch(next);
}
