import { Router } from "express";
const router = Router();

/* import { productDaoFS } from "../daos/fileSystem/products.dao.js"; */
import * as controller from "../controllers/carts.controller.js";


//MOSTRAR TODOS LOS CARRITOS
router.get("/all", controller.getAllCarts);

//CREAR CARRITO.
router.post("/", controller.createCart);

//MOSTRAR CARRITO POR ID.
router.get("/:id", controller.getCartById);

//MODIFICAR CARRITO.
router.put("/:id", controller.updateCart);

//ELIMINAR CARRITO.
router.delete("/:id", controller.deleteCart);

//AGREGAR PRODUCTO y CANTIDAD POR BODY
router.post("/:idCart/products/:idProd", controller.addProdToCart);

// ELIMINAR PORDUCTO DENTRO DEL CARRITO
router.delete("/:idCart/products/:idProd", controller.removeProdInCart);

// ACTUALIZAR CANTIDAD DEL PRODUCTO EN EL CARRITO
router.put("/:idCart/products/:idProd", controller.updateProdQuantityInCart);

// LIMPIAR CARRITO
router.delete("/clear/:idCart", controller.clearCart);

export default router;