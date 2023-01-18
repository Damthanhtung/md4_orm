import { Request, Response } from "express";
declare class OrderController {
    private orderService;
    private productService;
    constructor();
    showOrderDetail: (req: Request, res: Response) => Promise<void>;
    orderDetail: (req: Request, res: Response) => Promise<void>;
    showOrder: (req: Request, res: Response) => Promise<void>;
}
declare const _default: OrderController;
export default _default;
