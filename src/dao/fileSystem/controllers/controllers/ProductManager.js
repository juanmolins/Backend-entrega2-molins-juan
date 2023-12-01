import fs from 'fs'
import path from 'path'
import __dirname from '../../../../utils.js'
const dataJson = path.join( __dirname, 'data', 'products.json')

class ProductManager {
    constructor () {
        this.path = dataJson
        try{
        const data =fs.readFileSync(this.path, 'utf-8')
        this.products = JSON.parse(data)
        this.indexId =this.products.length + 1
        } catch(error){
            this.products = []
            this.indexId = 1
        }
    }

    // Guardar o sobreescribir el archivo json
    saveProducts = () => {
        const jsonData = JSON.stringify(this.products, null, 3)
        try {
            fs.writeFileSync(this.path, jsonData, 'utf-8')
            console.log('Producto guardado correctamente')
        } catch (error) {
            console.error(`Error al guardar el archivo ${error}`)
        }
    }


    // Generar un nuevo id
    generatedId = () => {
        return this.indexId++
        
    }


    // Agregar un nuevo producto
    addProducts = (newProduct) => {

        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock || !newProduct.category) {
            throw new Error('Completar todos los campos')
        }
        

        const existProduct = this.products.some(prod => prod.code === newProduct.code) 
        if(existProduct) {
            throw new Error(`Ya existe el producto ${newProduct.code}, coloque otro code`)
        }


        const generateNewId = this.generatedId()
        const product = {
            id: generateNewId,
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            thumbnails: newProduct.thumbnails,
            code: newProduct.code,
            stock: newProduct.stock,
            status: true,
            category: newProduct.category
        };


        this.products.push(product)
        this.saveProducts();
        return product

        console.log(`Producto ${newProduct.title} agregado correctamente`)
    }


    // Llamar a un producto por id
    getProductoById = (idProduct) => {
        const data = fs.readFileSync(dataJson, 'utf-8')
        const productJson = JSON.parse(data)

        const productExist = productJson.find(prod => prod.id === idProduct)
        if(!productExist) {
        throw new Error(`El producto ${idProduct} no existe`)
        } 
        console.log('Producto:', productExist)
        return productExist;

    }
    

    // Obtener todos los productos
    getProducts = () => {
        try {
            const data = fs.readFileSync(dataJson, 'utf-8')
            const products = JSON.parse(data)
            return products
            
        } catch (error) {
            console.error(`Error al obtener los productos ${error}`)
        }
    }       

    // Eliminar un producto
    deleteProduct = (idProduct) => {
        const data = fs.readFileSync(this.path, 'utf-8')
        const productJson = JSON.parse(data)
        const deleteProduct = productJson.findIndex(prod => prod.id == idProduct)
        if(deleteProduct=== -1) {
            throw new Error(`El producto ${idProduct} no existe para eliminarlo`)
        }


        productJson.splice(deleteProduct, 1);
        this.products = productJson
        this.saveProducts();
        return idProduct
    }

    // Actualizar un producto
    updateProduct = (idProduct, update)=> {
        const data = fs.readFileSync(this.path, 'utf-8')
        const productJson = JSON.parse(data)

        const productId = productJson.findIndex(prod => prod.id === idProduct)
        if(productId === -1) {
            throw new Error(`El producto que quiere actualizar no existe`)
        }

        const updateValues = {...productJson[productId], ...update}
        productJson[productId] = updateValues;

        fs.writeFileSync(this.path, JSON.stringify(productJson, null, 3));
        console.log(`Producto ${idProduct} actualizado correctamente`)
    }


}


const manager = new ProductManager();

export default ProductManager;




