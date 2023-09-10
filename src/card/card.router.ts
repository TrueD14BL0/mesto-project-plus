import { Router } from "express";
import { createCard, delCardById, dislikeCard, getAllCards, likeCard } from "./card.controller";

const cardRouter = Router();

cardRouter.get('/', getAllCards);
cardRouter.post('/', createCard );
cardRouter.delete('/:cardId', delCardById);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;