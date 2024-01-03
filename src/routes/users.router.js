import { Router } from "express";
import UserController from "../controllers/users.controller.js";
const controller = new UserController();
import ProductMongoDB from "../daos/mongoDB/products.dao.js";
import passport from "passport";
const prodDao = new ProductMongoDB();
import { ensureAuthenticated } from "../passport/github.strategy.js"
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.post("/register-local", passport.authenticate('register-local'), controller.registerResponse);

router.post("/login-local", passport.authenticate('login-local'), controller.loginResponse);

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get('/profile', async (req, res) => {
  try {
    const response = await prodDao.getAll();
    const products = response.payload.products;
    // console.log(products);
    res.render("profile", { products });
  } catch (error) {
    console.error(
      "Error getting products at profile views.router ::",
      error.message
      );
      res.status(500).send("Internal server error");
    }
  });


//-------------------------📌GIUTHUB LOGIN

  //cuando el usuario presione el boton "INICIAR SESISON CON GITHUB, se disparara este endpoint"
  router.get("/register-github",
    passport.authenticate("github", { scope: ["user:email"] })
  );
  
  router.get("/github", async (req, res) => {
      try {
        passport.authenticate("github", { scope: ["user:email"] }), (req, res) => res.send('hola');
      } catch (error) {
          console.error('Error al usar la ruta github la sesión:', error);
        
      }
    }  
  );

  router.get('/github-profile', ensureAuthenticated, async (req, res) => {
  try {
    const response = await prodDao.getAll();
    const products = response.payload.products;
    // console.log(products);
    res.render("github-profile", { products });
  } catch (error) {
    console.error(
      "Error getting products at profile views.router ::",
      error.message
      );
      res.status(500).send("Internal server error");
    }
  });
  




  router.get('/admin-profile', async (req, res) => {
    try {
      const response = await prodDao.getAll();
      const products = response.payload.products;
      // console.log(products);
      res.render("admin-profile", { products });
  } catch (error) {
    console.error(
      "Error getting products at profile views.router ::",
      error.message
    );
    res.status(500).send("Internal server error");
  }
});

router.get('/register-error', (req, res) => {
  res.render('register-error')
});

router.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
              console.error("Error closing session:", err);
              throw new Error("The session couldn't be destroyed la sesión");
            }
              console.log('Sesión de usuario destruida con éxito.');
              res.redirect('/login');
        });
    } catch (error) {
        console.error('Error al destruir la sesión:', error);
        return res.status(500).send('Error al cerrar sesión');
    }
});


router.get("/private", checkToken, (req, res) => {
  const { first_name, last_name, email, role } = req.user;
  res.json({
    status: "success",
    userData: {
      first_name,
      last_name,
      email,
      role,
    },
  });
});

export default router;
