import { NextFunction, Request, Response } from "express";
import userModel from "./user.model";
import NotFoundError from "../Errors/MyError";

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {name, about, avatar} = req.body;
  userModel.create({
    name: name,
    about: about,
    avatar: avatar,
  })
    .then((user) => {
      if(!user){
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  userModel.findById(req.params.userId)
    .then(user => {
      if(!user){
        throw new NotFoundError('Запрашиваемый пользователь не найден');
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
        throw new NotFoundError('Запрашиваемый пользователь не найден');
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
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
}
