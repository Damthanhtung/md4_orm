import {Router} from "express";
import homeController from "../controller/HomeController";
import {productRouter} from "./product-router";
import {orderRouter} from "./orderRouter";
import {userRouter} from "./userRouter";

export const router = Router();
router.get('/home', homeController.showHome)
router.post('/homeUser',homeController.search)
router.get('/homeUser',homeController.showUserHome)
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/orders', orderRouter);