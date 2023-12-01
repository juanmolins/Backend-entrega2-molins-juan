import mongoose from "mongoose";
import { productCollection } from "../constants/constants.js";
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,
    },

    thumbnails: {type: String},

    code: {
        type: String,
        required:true,
    },

    stock: {
        type: Number,
        required: true
    },

    status: {
        type: Boolean,
        default: true, // El campo "status" tendrá valor "true" por defecto al crear un nuevo producto
    },
    category: {
        type: String,
        required: true
    },

})

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productCollection, productSchema);

export default Product;