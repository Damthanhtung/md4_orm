"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const product_router_1 = require("./product-router");
const orderRouter_1 = require("./orderRouter");
const userRouter_1 = require("./userRouter");
exports.router = (0, express_1.Router)();
exports.router.use('/products', product_router_1.productRouter);
exports.router.use('/users', userRouter_1.userRouter);
exports.router.use('/orders', orderRouter_1.orderRouter);
//# sourceMappingURL=router.js.map