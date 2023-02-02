
import {User} from "../model/user";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {SECRET} from "../middleware/auth";

class UserService {
    private userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    getAll = async () => {
        let users = await this.userRepository.find();
        return users;
    }

    checkUser = async (user)=> {
        let userCheck = await this.userRepository.findOneBy({username : user.username} )
        if (!userCheck){
            return 'username is not exist';
        } else {
            let passwordCompare = bcrypt.compare(user.password, userCheck.password);
            if (!passwordCompare) {
                return 'Password is wrong';
            } else {
                let payload = {
                    idUser: userCheck.id,
                    username: userCheck.username,
                    role: userCheck.role
                }
                let userRes = {
                    idUser: userCheck.id,
                    username: userCheck.username,
                    role: userCheck.role,
                    token: await jwt.sign(payload, SECRET,
                        {
                            expiresIn: 360000
                        })

                }
                return userRes;

            }

        }

    }
    register = async (user) =>{
        user.password = await bcrypt.hash(user.password,10);
        return this.userRepository.save(user);
    }


    save = async (user) => {
        // console.log(user)
        return  this.userRepository.save(user);
    }
}

export default new UserService();