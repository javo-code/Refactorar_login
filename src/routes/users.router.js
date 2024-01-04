import { Router } from "express";
import UserController from "../controllers/users.controller.js";
const controller = new UserController();
import ProductMongoDB from "../daos/mongoDB/products.dao.js";
import passport from "passport";
const prodDao = new ProductMongoDB();
import { ensureAuthenticated } from "../passport/github.strategy.js"
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

//-------------------------📌LOCAL STRATEGY ROUTES

router.post("/register-local", passport.authenticate('register-local'), controller.registerResponse);

router.post("/login-local", passport.authenticate('login-local'), controller.loginResponse);

router.post("/register", controller.register);

router.post("/login", controller.login);


//-------------------------📌JWT STRATEGY ROUTES

router.post("/registerJWT", controller.registerJWT);

router.post("/loginJWT", controller.loginJWT);

router.get('/profile', async (req, res) => {
  try {
    const response = await prodDao.getAll();
    const products = response.payload.products;

    if (req.session.email) {
      // Aquí obtienes los datos del usuario desde MongoDB usando el email almacenado en la sesión
      const user = await userService.getUserByEmail(req.session.email);

      // Verifica si se encontró el usuario en la base de datos
      if (user) {
        // Pasa los datos del usuario y los productos a la plantilla Handlebars
        res.render("profile", { 
          products,
          user: {
            name: user.name,
            email: user.email,
            // Otros datos del usuario, si es necesario
          }
        });
      } else {
        // Si no se encuentra el usuario en la base de datos, redirige o maneja el caso en consecuencia
        res.redirect('/error-login');
      }
    } else {
      // Si no hay email en la sesión, redirige al usuario a la página de error o maneja el caso en consecuencia
      res.redirect('/error-login');
    }
  } catch (error) {
    console.error("Error getting products at profile views.router ::", error.message);
    res.status(500).send("Internal server error");
  }
});


//-------------------------📌GITHUB STRATEGY ROUTES

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
  

//-------------------------📌ADMIN PROFILE ROUTES

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

//-------------------------📌LOGOUT

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

//-------------------------📌PRIVATE ROUTE

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

router.post("/loginJWTFront", controller.loginJWTFront);

export default router;
