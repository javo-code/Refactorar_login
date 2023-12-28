import { Router } from "express";
import UserController from "../controllers/users.controller.js";
const controller = new UserController();
import ProductMongoDB from "../daos/mongoDB/products.dao.js";
import passport from "passport";
const prodDao = new ProductMongoDB();


const router = Router();

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

router.get("/register-github", passport.authenticate("github", { scope: ["user:email"] }));

router.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error closing session:', err);
                throw new Error('No se pudo destruir la sesión');
            }
            // Mensaje de confirmación de sesión destruida
            console.log('Sesión de usuario destruida con éxito.');

            // Redireccionar a la página de inicio de sesión después de cerrar sesión exitosamente
            res.redirect('/login');
        });
    } catch (error) {
        console.error('Error al destruir la sesión:', error);
        return res.status(500).send('Error al cerrar sesión');
    }
});


export default router;
