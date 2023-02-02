import {Request, Response} from "express";
import productService from "../service/ProductService";
import categoryService from "../service/CategoryService";
import orderService from "../service/OrderService";
class HomeController {
    private productService;
    private categoryService;
    private orderService;

    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
        this.orderService = orderService;

    }

    getAll = async (req: Request, res: Response) => {
        let products = await productService.getAll();
        res.status(200).json(products)
    }
    showUserHome = async (req: Request,res:Response) => {
        let products = await productService.getAll()
        // @ts-ignore
        let user = req.session.User
        res.render('homeUser', {products: products, user: user})
    }

    // showFormCreate = async (req: Request, res: Response) => {
    //     let categories = await this.categoryService.getAll();
    //     res.render('products/create',{categories: categories});
    // }

    create = async (req: Request, res: Response) => {
        try {
            let product = await productService.save(req.body);
            res.status(200 ).json(product);
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }

    }

    //
    // showFormEdit = async (req: Request, res: Response) => {
    //     let id = req.params.id;
    //     let product = await this.productService.findById(id);
    //     let categories = await this.categoryService.getAll();
    //     // console.log(product)
    //     res.render('products/edit', {product: product,categories: categories});
    //
    // }
    update = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let product = await this.productService.update(id,req.body);
            console.log(req.body);
            res.status(200).json(product);
        } catch (e) {
            res.status(500).json({
                message: e.message

            })

        }
    }
    //
    // showFormDelete = async (req: Request, res: Response) => {
    //     let idDelete = req.params.id;
    //     res.render('products/delete', {idDelete: idDelete});
    // }

    remove = async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            let product = await this.productService.remove(id);
            res.status(200).json(product);
        } catch (e) {
            res.status(500).json({
                message: e.message

            })

        }
    }
    search = async (req: Request, res: Response) => {
        try {
            let products = await productService.search(req.query.name);
            let categories = await categoryService.getAll();
            let data = [ products, categories];
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

}

export default new HomeController();