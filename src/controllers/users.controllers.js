import UserServices from "../services/user.services.js";
const userService = new UserServices();

export default class UserController {
  async register(req, res, next) {
    console.log(req.body);
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
    const { email, password } = req.body;
    const user = await userService.login(email, password);

    if (user) {
      req.session.email = email;
      req.session.password = password;

      if (user.role === 'user') {
        res.redirect('/profile');
      } else if (user.role === 'admin') {
        res.redirect('/admin-profile');
      } else {
        res.redirect('/profile');
      }
    } else {
      res.redirect('/register-error');
    }
  } catch (error) {
    next(error);
  }
}
}