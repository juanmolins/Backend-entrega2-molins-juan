import Product from "./models/productsModel.js";

class ProductMongoManager {
    constructor() {
    
    }

    async getAllProducts () {
        try {
            const product = await Product.find().lean();
            return product;
        } catch(error) {
            throw new Error(`Error al obtener todos los productos ${error}`)
        }
    }

    async getProducts(filter) {
        try {
            const products = await Product.find(filter).lean();
            return products;
        } catch (error) {
            throw new Error(`Error al obtener los productos ${error}`);
        }
    }

    async addNewProducts (newProduct) {
        try {
            const productAdd = new Product(newProduct)
            return await productAdd.save();
        } catch (error) {
            throw new Error(`Error al guardar el producto ${error.message}`)
        }
    }

    async deleteProduct(productId) {
        try {   
            return await Product.findByIdAndDelete(productId)
        } catch (error) {
            throw new Error(`Error al eliminar el producto ${productId} ${error.message}`)
        }
    }
}

export {ProductMongoManager as ProductMongoManager}