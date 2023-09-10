import { Router } from "express";
import { createUser, getAllUsers, getUserById, patchAvatarInfo, patchUserInfo } from "./user.controller";

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', patchUserInfo);
userRouter.patch('/me/avatar', patchAvatarInfo);

export default userRouter;