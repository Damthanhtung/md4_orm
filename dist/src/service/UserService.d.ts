declare class UserService {
    private userRepository;
    constructor();
    getAll: () => Promise<any>;
    checkUser: (user: any) => Promise<"username is not exist" | "Password is wrong" | {
        idUser: any;
        username: any;
        role: any;
        token: any;
    }>;
    register: (user: any) => Promise<any>;
    save: (user: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
