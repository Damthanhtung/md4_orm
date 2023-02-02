import {Router} from "express";
import userController from "../controller/UserController";

export const userRouter = Router();
// userRouter.get('/login', userController.showFormLogin);
// userRouter.post('/login', userController.login);
// userRouter.get('/logout', userController.logout);
// userRouter.get('/signup', userController.formSignup);
// userRouter.post('/signup', userController.signup);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
