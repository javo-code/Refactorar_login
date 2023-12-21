const cartDao = new CartDaoMongoDB(); 
import CartDaoMongoDB from "../dao/mongoDB/carts.dao.js";
const prodDao = new PorductsDaoMongoDB();
import PorductsDaoMongoDB from "../dao/mongoDB/products.dao.js";
import fs from "fs";
import { __dirname } from "../utils.js";

/* import ProductDaoFS from "../dao/fileSystem/products.dao.js";
import { __dirname } from "../utils.js";
const prodDao = new ProductDaoFS(
  __dirname + '/data/products.json'
) */

const cartsFile = JSON.parse(
  fs.readFileSync(__dirname + "/data/carts.json", "utf-8")
);

export const createFileCart = async () => {
  try {
    const newCart = await cartDao.createVart(cartsFile);
    if (!newCart) return false;
    return { message: "Carts array saved sucesfully!" };
  } catch (error) {
    console.log(error);
    throw new Error('Error at createFileCart - service');
  }
};

export const getAll = async () => {
  try {
    return await cartDao.getAll();
  } catch (error) {
    console.log(error);
    throw new Error('Error at getAll - service');
  }
};

export const getById = async (id) => {
  try {
    const cart = await cartDao.getById(id);
    if (!cart) return false;
    else return cart;
  } catch (error) {
    console.log(error);
    throw new Error('Error at getById - service');
  }
};

export const create = async (obj) => {
  try {
    const newCart = await cartDao.create(obj);
    if (!newCart) return false;
    else return newCart;
  } catch (error) {
    console.log(error);
    throw new Error('Error at create - service');
  }
};

export const update = async (id, obj) => {
  try {
    const cartUpd = await cartDao.update(id, obj);
    if (!cartUpd) return false;
    else return cartUpd;
  } catch (error) {
    console.log(error);
    throw new Error('Error at update - service');
  }
};

export const  remove = async (id) => {
  try {
    const cartDel = await cartDao.delete(id);
    if (!cartDel) return false;
    else return cartDel;
  } catch (error) {
    console.log(error);
    throw new Error('Error at remove - service');
  }
};

export const addProdToCart = async (cartId, prodId) => {
  try {
    const existCart = await getById(cartId);
    console.log("existCart-->", existCart);
    if (!existCart) return false;

    const existProd = await prodDao.getById(prodId);
    console.log("existProd-->", existProd);
    if (!existProd) return false;
      //SI EXISTE, AUMENTAR quantity++
    return await cartDao.addProdToCart(existCart, prodId);
  } catch (error) {
    console.log(error);
  }
};

export const removeProdInCart = async (cartId, prodId) => {
    try {
      const existCart = await getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return false;
  
      const existProd = existCart.products.find((p)=>p.product._id.toString() === prodId.toString());
      console.log("existProd-->", existProd);
      if (!existProd) return false;
  
      return await cartDao.removeProdInCart(existCart, existProd);
    } catch (error) {
      console.log(error);
    }
  };

  export const updateProdQuantityInCart = async (cartId, prodId, quantity) => {
    try {
      const existCart = await getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return false;
  
      const existProd = existCart.products.find((p)=>p.product._id.toString() === prodId.toString());
      console.log("existProd-->", existProd);
      if (!existProd) return false;
  
      return await cartDao.updateProdQuantityInCart(existCart, existProd, quantity);
    } catch (error) {
      console.log(error);
    }
  };

  export const clearCart = async (cartId) => {
    try {
      const existCart = await getById(cartId);
      console.log("existCart-->", existCart);
      if (!existCart) return false;

      return await cartDao.clearCart(existCart);
    } catch (error) {
      console.log(error);
    }
  };