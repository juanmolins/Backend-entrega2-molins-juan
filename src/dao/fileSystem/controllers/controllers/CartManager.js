import fs from 'fs'
import path from 'path';
import __dirname from '../../../../utils.js';

const dataJsonCart = path.join(__dirname, 'data', 'carts.json')


class CartManager {

    constructor () {
        this.path = dataJsonCart


        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(data)
            this.cartIdCounter = this.carts.length + 1
        } catch (error) {
            this.carts = [];
            this.cartIdCounter = 1;
        }
        
    }


    // Guardar o sobreescribir archivo json  
    saveCarts = () => {
        try {
            const jsonData = JSON.stringify(this.carts, null, 3)
            fs.writeFileSync(this.path, jsonData, 'utf-8' )
            console.log('Guardado correctamente en el archivo')
        } catch (error) {
            console.error(`Error al guardar en el archivo : ${error.message}`)
        }
    }



    // Generar un nuevo id
    generateIdCart = () => {
        return this.cartIdCounter++
    }




    // Crear un nuevo carrito
    createCart = () => {
        const newId = this.generateIdCart()
        const newCart = {
            id: newId,
            products: []
        }

        this.carts.push(newCart)
        this.saveCarts();
        console.log(`Carrito ${newId} creado correctamente`)
    }


    


    // Eliminar carrito
    deleteCart = (idCart) => {
        const data = fs.readFileSync(this.path, 'utf-8')
        const cartJson = JSON.parse(data)
        const deleteCart = cartJson.findIndex(cart=> cart.id  === idCart)

        if(deleteCart === -1 ) {
            throw new Error(`El carrito ${idCart} no existe para eliminar`)
        }

        cartJson.splice(deleteCart, 1)
        this.carts = cartJson;
        this.saveCarts();

    }

    //  Llamar a un carrito por id
    getCartById = (idCart) => {
        const data = fs.readFileSync(this.path, 'utf-8')
        const cartJson = JSON.parse(data)

        const cartExist = cartJson.find(cart => cart.id === idCart)
        if(!cartExist) {
            throw new Error(`Carrito ${idCart} no existe`)
        } 
        console.log('Carrito', cartExist)
            return cartExist
    }




    // Agregar un producto al carrito
        addProductToCart = (cid, pid) => {
            try {
            const cartData = fs.readFileSync(this.path, 'utf-8');
            let carts = JSON.parse(cartData);
            const cartIndex = carts.findIndex((cart) => cart.id === cid);
        
            if (cartIndex !== -1) {
                const existProductIndex = carts[cartIndex].products.findIndex(
                (product) => product.product === pid
                );
        
                if (existProductIndex !== -1) {
                carts[cartIndex].products[existProductIndex].quantity += 1;
                } else {
                carts[cartIndex].products.push({ product: pid, quantity: 1 });
                }
            } else {
                carts.push({ id: cid, products: [{ product: pid, quantity: 1 }] });
            }
        
            fs.writeFileSync(this.path, JSON.stringify(carts, null, 3), 'utf-8');
            console.log('Producto agregado al carrito correctamente');
            } catch (error) {
            console.error('Error al guardar los datos del carrito:', error);
            }
        };
}


export default CartManager;