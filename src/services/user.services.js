import { UserModel } from "../dao/mongoDB/models/user.model.js";

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
      const newUser = await UserModel.create(user);
      return newUser;
    } else {
      return false;
    }
    } catch (error) {
      console.log(error);
    }
  }

  async login(email, password) {
    try {
     
      console.log('body', email, password);
      const userExist = await UserModel.findOne({ email, password });
      console.log('login::', userExist);
      if (!userExist) return false;
      else return userExist;
    } catch (error) {
      console.log(error);
    }
  }
};