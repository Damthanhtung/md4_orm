"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
class UserService {
    constructor() {
        this.getAll = async () => {
            let users = await this.userRepository.find();
            return users;
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!userCheck) {
                return 'username is not exist';
            }
            else {
                let passwordCompare = bcrypt_1.default.compare(user.password, userCheck.password);
                if (!passwordCompare) {
                    return 'Password is wrong';
                }
                else {
                    let payload = {
                        idUser: userCheck.id,
                        username: userCheck.username,
                        role: userCheck.role
                    };
                    let userRes = {
                        idUser: userCheck.id,
                        username: userCheck.username,
                        role: userCheck.role,
                        token: await jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                            expiresIn: 360000
                        })
                    };
                    return userRes;
                }
            }
        };
        this.register = async (user) => {
            user.password = await bcrypt_1.default.hash(user.password, 10);
            return this.userRepository.save(user);
        };
        this.save = async (user) => {
            return this.userRepository.save(user);
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map