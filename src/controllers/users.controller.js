import UserDao from "../daos/mongoDB/users.dao.js";
const userDao = new UserDao();
import { generateToken } from "../jwt/auth.js";

export default class UserController {
  async registerResponse(req, res, next) {
    try {
      res.json({
        msg: "register ok!",
        session: req.session
      });
    } catch (error) {
      next(error.message);  
    }
  }


async loginResponse(req, res, next) {
    try {
      const id = req.session.passport.user;
      const user = await userDao.getById(id);
      const { first_name, last_name } = user;
      res.json({
        msg: "login ok!",
        user: {
          first_name, last_name
        }
      });
    } catch (error) {
      next(error.message);
    }
  }
  
/*   async githubResponse(req, res, next) {
    try {
      const user = await UserDao.getById(req.session.passport.user);
      console.log(req.user);
      const { first_name, email } = req.user;
      res.json({
        msg: "Register / Login with GITHUB ok!",
        user: {
          first_name,
          email,
          isGithub
        }
      })
      } catch (error) {
      next(error);  
    }
  }

  async register(req, res, next) {
    console.log("clg desde el REGISTER del user.cotroller", req.body);
    try {
      const user = await userService.register(req.body);
      if (user) res.redirect("/login");
      else res.redirect("/register-error");
    } catch (error) {
      next(error);  
    }
  }

  
async login(req, res, next) {
    try {
        const { email } = req.body;
      const user = await userService.login(req.body);
      if(user) {
        console.log("clg desde el LOGIN del user.cotroller", req.session);
        req.session.email = email;
        res.redirect('/profile');
        } else res.redirect('/error-login')
    } catch (error) {
      next(error);  
    }
  } */

    async register(req, res, next) {
    try {
      const { first_name, last_name, email, age, password } = req.body;
      const exists = await userDao.getByEmail(email);
      if (exists) return res.status(400).json({ msg: "User already exists" });
      const user = { first_name, last_name, email, age, password };
      const newUser = await userDao.createUser(user);
      res.json({
        msg: "Register OK"
      })
    } catch (error) {
      next("Error desde el registerJWT en el users.controller.js:", error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userDao.loginUser({ email, password });
      if (!user) res.json({ msg: "Invalid credeentials - loginJWT" });
      const accessToken = generateToken(user);
      res
        .header("Authorization", accessToken) //seteamos el header con el id del user generado por mongo
        .json({ msg: "Login OK", accessToken });
    } catch (error) {
      
    }
  }
}