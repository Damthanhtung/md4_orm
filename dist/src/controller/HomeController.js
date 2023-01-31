"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../service/ProductService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
const OrderService_1 = __importDefault(require("../service/OrderService"));
class HomeController {
    constructor() {
        this.getAll = async (req, res) => {
            let products = await ProductService_1.default.getAll();
            res.status(200).json(products);
        };
        this.showUserHome = async (req, res) => {
            let products = await ProductService_1.default.getAll();
            let user = req.session.User;
            res.render('homeUser', { products: products, user: user });
        };
        this.create = async (req, res) => {
            try {
                let product = await ProductService_1.default.save(req.body);
                res.status(200).json(product);
            }
            catch (e) {
                res.status(500).json({
                    message: e.message
                });
            }
        };
        this.update = async (req, res) => {
            try {
                let id = req.params.id;
                let product = await this.productService.update(id, req.body);
                console.log(req.body);
                res.status(200).json(product);
            }
            catch (e) {
                res.status(500).json({
                    message: e.message
                });
            }
        };
        this.remove = async (req, res) => {
            try {
                let id = req.params.id;
                let product = await this.productService.remove(id);
                res.status(200).json(product);
            }
            catch (e) {
                res.status(500).json({
                    message: e.message
                });
            }
        };
        this.search = async (req, res) => {
            try {
                let products = await ProductService_1.default.search(req.query.name);
                let categories = await CategoryService_1.default.getAll();
                let data = [products, categories];
                res.status(200).json(data);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.productService = ProductService_1.default;
        this.categoryService = CategoryService_1.default;
        this.orderService = OrderService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map