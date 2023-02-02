import {Request, Response} from "express";
import userService from "../service/UserService";
import orderService from "../service/OrderService";

class UserController {
    private userService;
    private orderService;

    constructor() {
        this.userService = userService;
        this.orderService =orderService;
    }
    register = async (req: Request, res: Response) => {
        let user = await this.userService.register(req.body);
        res.status(201).json(user);
    }
    login = async (req: Request, res: Response) => {
        let response = await this.userService.checkUser(req.body);
        res.status(200).json(response);
    }

    // showFormLogin = async (req: Request, res: Response) => {
    //     await userService.getAll();
    //     res.render('user/login')// read file
    // }
    //
    // login = async (req: Request, res: Response)=>{
    //     let user = await this.userService.checkUser(req.body);
    //     if(user.role ==='admin') {
    //         // @ts-ignore
    //         req.session.User = user
    //         res.redirect(301,'/home');
    //     }else if(user.role === 'member'){
    //         // @ts-ignore
    //         req.session.User = user
    //         await orderService.orderLoad()
    //         res.redirect(301,'/homeUser');
    //     }else{
    //         res.redirect(301,'/users/login');
    //     }
    // }
    //
    // logout = async (req: Request, res: Response) => {
    //     // @ts-ignore
    //     req.session.destroy((err)=>{
    //         return  res.redirect('/users/login')
    //     })
    //
    // }
    // formSignup = async (req: Request, res: Response) => {
    //     res.render('user/signup')// read file
    // }
    // signup = async (req: Request, res: Response) => {
    //     let user = req.body;
    //             await userService.save(user);
    //             res.redirect(301, '/home');
    //
    // }

}

export default new UserController();