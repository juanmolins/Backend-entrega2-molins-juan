import mongoose from "mongoose";
import { cartCollection } from "../constants/constants.js";
import { productCollection } from "../constants/constants.js";

const cartSchema = new mongoose.Schema({
    
    products:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: productCollection,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        }
    ],
})

cartSchema.pre(['find','findOne'], function(){
    this.populate(`${productCollection}.product`)
})


const Cart = mongoose.model(cartCollection, cartSchema);

export default Cart;