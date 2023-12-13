import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollectionName = 'products'

export const productSchema = new Schema({
    title: { type: String, required: true, index: true},
    description: { type: String, required: true},
    code: { type: String, required: true, index: true},
    price: { type: Number, required: true, index: true},
    stock: { type: Number, required: true},
    category: { type: String, required: true, index: true},
    thumbnails: { type: String },
    onsale: { type: Boolean, default: false, index: true}
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(productCollectionName, productSchema);