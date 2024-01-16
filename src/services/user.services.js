import { UserModel } from "../daos/mongoDB/models/user.model.js";
import { createHash, isValidPass } from "../utils.js";

export default class UserServices {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.getByEmail(email);
      if(!existUser){
        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
          return await UserModel.create({
            ...user,
            // password: createHash(password),
            password,
            role: 'admin'
        });
        } 
          return await UserModel.create({
              ...user,
              // password: createHash(password),
              password
          });
        } else return false;
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        const isValidPassword = isValidPass(userExist, password);
        console.log('isValid? =>', isValidPass);
        if (!isValidPassword) return false;
        else return userExist;
      } return false;
    } catch (error) {
      console.log(error);
    }
  }
};