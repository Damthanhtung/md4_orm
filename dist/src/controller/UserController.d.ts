import { Request, Response } from "express";
declare class UserController {
    private userService;
    private orderService;
    constructor();
    showFormLogin: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response) => Promise<void>;
    formSignup: (req: Request, res: Response) => Promise<void>;
    signup: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
