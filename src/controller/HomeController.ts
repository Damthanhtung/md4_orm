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

    showHome = async (req: Request, res: Response) => {
        let products = await productService.getAll();
        // console.log(products)
        res.render('home', {products: products})
    }
    showUserHome = async (req: Request,res:Response) => {
        let products = await productService.getAll()
        // @ts-ignore
        let user = req.session.User
        res.render('homeUser', {products: products, user: user})
    }

    showFormCreate = async (req: Request, res: Response) => {
        let categories = await this.categoryService.getAll();
        res.render('products/create',{categories: categories});
    }

    create = async (req: Request, res: Response) => {
        if (req.files) {
            let image = req.files.image;
            if ("mv" in image) {
                await image.mv('./public/storage/' + image.name)
                let product = req.body;
                product.image = '/storage/' + image.name;
                await productService.save(product);
                res.redirect(301, '/home');
            }
        }
    }

    showFormEdit = async (req: Request, res: Response) => {
        let id = req.params.id;
        let product = await this.productService.findById(id);
        let categories = await this.categoryService.getAll();
        // console.log(product)
        res.render('products/edit', {product: product,categories: categories});

    }
    update = async (req: Request, res: Response) => {
        if (req.files) {
            let image = req.files.image;
            if ("mv" in image) {
                await image.mv('./public/storage/' + image.name)
                let id = req.params.id;
                let product = req.body;
                product.image = '/storage/' + image.name;
                await this.productService.update(id, product);
                res.redirect(301, '/home');
            }
        }
    }

    showFormDelete = async (req: Request, res: Response) => {
        let idDelete = req.params.id;
        res.render('products/delete', {idDelete: idDelete});
    }

    remove = async (req: Request, res: Response) => {
        let id = req.params.id;
        await this.productService.remove(id);
        res.redirect(301, '/home');

    }
    search = async (req: Request, res: Response) => {
        let search = req.body;
        // console.log(search)
        let products = await productService.findByName(search);
        res.render('homeUser', {products: products})
    }
}

export default new HomeController();