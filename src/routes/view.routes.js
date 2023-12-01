import { Router  } from "express";
import ProductManager from "../dao/fileSystem/controllers/controllers/ProductManager.js";
import { ProductMongoManager } from "../dao/mongo/ProductMongoManager.js";
import { CartMongoManager } from "../dao/mongo/CartMongoManager.js";

// Manager fs
const product = new ProductManager()
const productList = product.getProducts();

// Manager mongo
const productMongo = new ProductMongoManager();
const cartMongo = new CartMongoManager()
const router = Router()




// Vista con fs





// router.get('/home', (req,res)=> {
//     res.render('home', { productList, style: "home.css" })
    
// })

// router.get('/realTimeProducts', (req, res)=> {
//     res.render('realTimeProducts', {productList, style: 'realTime.css'})
// })



// Vistas con mongo


/* Vista con MongoDb */

router.get('/products', async (req, res) => {
    try {
      // Obtener todos los productos paginados
      // Asegúrate de tener lógica en tu ProductManager para manejar la paginación
      const products = await productManager.getAllProductsPaginated(req.query.page || 1);
  
      // Renderizar la vista con la lista de productos
      res.render('products', { products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de productos' });
    }
  });

router.get('/chat', (req, res)=> {
    res.render('chat',{style: 'chat.css'})
})

router.get('/home', async(req, res)=> {
    try {

        const productsMongo = await productMongo.getAllProducts();
        res.render('home', {productsMongo, style: 'home.css'})
    } catch (error) {
        res.status(500).send('Error al obtener todos los productos')
    }
})

router.get('/realTimeProducts', async(req, res)=> {
    try {
        const productsMongo = await productMongo.getAllProducts()
        res.render('realTimeProducts', {productsMongo, style: 'realTime.css'})
    } catch (error) {
        res.status().send('Error al obtener los datos')
    }
})


router.get('/cart')


export {router as viewRouter}