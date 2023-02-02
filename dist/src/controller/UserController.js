"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const OrderService_1 = __importDefault(require("../service/OrderService"));
class UserController {
    constructor() {
        this.register = async (req, res) => {
            let user = await this.userService.register(req.body);
            res.status(201).json(user);
        };
        this.login = async (req, res) => {
            let response = await this.userService.checkUser(req.body);
            res.status(200).json(response);
        };
        this.userService = UserService_1.default;
        this.orderService = OrderService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map