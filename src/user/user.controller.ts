import { NextFunction, Request, Response } from "express";
import userModel from "./user.model";
import MyError from "../Errors/MyError";
import bcrypt from 'bcryptjs';
import { USER_NOT_FOUND } from "../utils/error-constants";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {name, about, avatar, email, password} = req.body;
  bcrypt.hash(password,10)
    .then(hash =>
      userModel.create({
      name: name,
      about: about,
      avatar: avatar,
      email: email,
      password: hash,
    }))
    .then((user) => {
      if(!user){
        throw MyError.NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch(next);
};



export const getUserInfo = (req: Request, res: Response, next: NextFunction) => {
  userModel.findById(req.user._id)
    .then(user => {
      if(!user){
        throw MyError.NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch(next);
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  userModel.findById(req.params.userId)
    .then(user => {
      if(!user){
        throw MyError.NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch(next);
}

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  userModel.find({})
    .then(users => res.send(users))
    .catch(next);
}

export const patchUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  userModel.findByIdAndUpdate(
    req.user._id,
    { name: name,
      about: link },
    { new: true,
      runValidators: true,
    },
  )
    .then(user => {
      if(!user){
        throw MyError.NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch(next);
}

export const patchAvatarInfo = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    { new: true,
      runValidators: true,
    },
  )
    .then(user => {
      if(!user){
        throw MyError.NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch(next);
}
