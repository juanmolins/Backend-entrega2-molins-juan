import Cart from "./models/cartModel.js"
import Product from "./models/productsModel.js";

class CartMongoManager {
    constructor (){

    }

    async createCart () {
        try {
            const newCart = new Cart({products: []})
            const savedCart = await newCart.save();
            return savedCart;
        } catch (error) {
            throw new Error(`Error al crear el carrito ${error.message}`)
        }
    }

    async addProductToCart (idCart, idProduct, quantity) {
        try {

            const cart = await Cart.findById(idCart)
            if(!cart) throw new Error(`Carrito ${idCart} no encontrado`)

            const product = await Product.findById(idProduct)
            if(!product) throw new Error(`Producto ${idProduct} no encontrado `)

            const existignProduct = cart.products.find((item)=> item.product.equals(idProduct))
            if(existignProduct){
                existignProduct.quantity += quantity;
            } else {
                cart.products.push({product: idProduct, quantity})
            }

            await cart.save();

            const cartId = cart.toObject()
            delete cartId._id;
            
            return cart
        } catch (error) {
            throw new Error(`Error al guardar el producto ${error.message}`)
        }
    }


    async getCartById (idCart){

        try {
            const cart = await Cart.findById(idCart)

            if(cart){
                cart.products = cart.products.map(item=> {
                    return {
                        product: item.product,
                        quantity: item.quantity
                    }
                })
            }

            return cart
        } catch (error) {
            throw new Error(`Errro al obtener el carrito ${idCart} ${error.message}`)
        }
    }

    async deleteCart (idCart) {

        try {
            const cartDelete = await Cart.findByIdAndDelete(idCart)
            return cartDelete;
        } catch (error) {
            throw new Error(`No se puede eliminar el carrito ${error.message}`)
        }
    }

}


export {CartMongoManager as CartMongoManager}