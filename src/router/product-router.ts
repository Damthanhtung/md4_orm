import {Router} from "express";
import homeController from "../controller/HomeController";
import {router} from "./router";
export const productRouter = Router();

productRouter.get('/', homeController.getAll)
productRouter.post('/' , homeController.create);
productRouter.put('/:id', homeController.update);
productRouter.delete('/:id', homeController.remove);
productRouter.get('/find-by-name', homeController.search);
