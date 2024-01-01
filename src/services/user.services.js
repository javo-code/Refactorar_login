import { UserModel } from "../daos/mongoDB/models/user.model.js";
import { createHash, isValidPass } from "../utils.js";

export default class UserServices {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async register(user) {
    try {
      const { email, password } = user;

      if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        const adminUser = await UserModel.create({ ...user, role: 'admin' });
        return adminUser;
      }

      const exists = await this.findByEmail(email);
      if (!exists) {
        const newUser = await UserModel.create({
          ...user,
          password: createHash(password)
        });
        return newUser;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
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