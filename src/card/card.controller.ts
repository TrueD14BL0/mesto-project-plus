import { NextFunction, Request, Response } from "express";
import cardModel from "./card.model";
import NotFoundError from "../Errors/MyError";

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const {name, link} = req.body;
  cardModel.create({
    name,
    link,
    owner: req.user._id,
    likes: [],
    createdAt: Date.now(),
  })
    .then((card) => {
      res.send(card)
    })
    .catch(next);
};

export const getAllCards = (req: Request, res: Response, next: NextFunction) => {
  cardModel.find({})
    .then(cards => {
      res.send(cards)
    })
    .catch(next);
}

export const delCardById = (req: Request, res: Response, next: NextFunction) => {
  cardModel.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if(!card){
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
}

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true,
      runValidators: true,
    },
  )
    .then(card => {
      if(!card){
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
}

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true,
      runValidators: true,
    },
  )
    .then(card => {
      if(!card){
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
}
