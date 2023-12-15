import { CartModel } from "./models/carts.model.js";


export default class CartsDaoMongoDB {
    async getAll() {
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.error('Error al obtener todos los carritos:', error);
            throw new Error('Error al obtener todos los carritos');
        }
    }

    async getById(id) {
        try {
            const response = await CartModel.findById(id).populate('products');
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            return await CartModel.findByIdAndUpdate({ _id: id }, obj, {
            new: true,
            });
        } catch (error) {
            console.log(error);
        }
    }


    async delete(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }    
    

    async addProdToCart(cartId, prodId) {
  try {
        const cart = await CartModel.findById(cartId);
        
        if (!cart) {
            return false;
        }
        
        const existingProduct = cart.products.find(item => item.product.equals(prodId));
        
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ product: prodId });
        }

        await cart.save();
        return cart;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding product to cart');
    }
}

    async removeProdInCart(cart, prod) {
        try {
        cart.products = cart.products.filter(
            (p) => p.product._id.toString() !== prod.product._id.toString()
        );
        cart.save();
        return cart;
        } catch (error) {
        console.log(error);
        }
    }

    async updateProdQuantityInCart(cart, prod, quantity) {
        try {
        prod.quantity = quantity;
        cart.save();
        return prod;
        } catch (error) {
        console.log(error);
        }
    }

    async clearCart(cart) {
        try {
        cart.products = [];
        cart.save();
        return cart;
        } catch (error) {
        console.log(error);
        }
    }
}
