import { Router } from "express";
const router = Router();

import { productValidator } from "../middlewares/productValidator.js"
/* import { productDaoFS } from "../daos/fileSystem/products.dao.js"; */
import * as controller from "../controllers/products.controller.js";


//MOSTRAR TODOS LOS PRODUCTOS - LIMIT / PAGINATE
router.get("/all", controller.getAllProducts);

//CREAR PRODUCTO.
router.post("/", productValidator, controller.createProduct);

//CREAR ARCHIVO CON PRODUCTOS
router.post('/file', controller.createFileCtr);

//AGREGAR PRODUCTO AL CARRITO.
router.post("/add/:idCart/:idProd", controller.addProdToCart)

//MOSTRAR PRODUCTO POR ID.
router.get("/id/:id", controller.getProductById);

//MODIFICAR PRODUCTO.
router.put("/:id", controller.updateProduct);

//ELIMINAR PRODUCTO.
router.delete("/:id", controller.deleteProduct);

// ACTUALIZACION MASIVA DE DOCUMENTOS - AGREGO PROPIEDAD "ONSALE".
router.put('/updatedocs', controller.updateManyOnsale);

// AGGREGATION 1.
router.get("/firstFiveByCategory", controller.firstFiveByCategory);

// AGGREGATION 2.
router.get("/quantityByCategory", controller.quantityByCategory);

// AGGREGATION 3.
router.get("/getPromotions", controller.getPromotions);

// ORDEN POR PRECIO - DESCENDENTE
router.get('/orderByPrice', controller.orderByPrice);

export default router;