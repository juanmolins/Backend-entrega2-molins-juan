import { Router } from "express";
import { ProductMongoManager } from "../dao/mongo/ProductMongoManager.js";

const products = new ProductMongoManager()
const router = Router()


// Metodos con fs
router.get('/', async (req, res) => {
    try {
        const { category, availability, sort } = req.query;

        // Construir filtro de búsqueda para MongoDB
        const filter = {};
        if (category) {
            filter.category = category;
        }
        if (availability) {
            filter.availability = availability === 'true'; // Convertir a booleano
        }

        // Obtener productos con filtro
        let result = await products.getProducts(filter);

        // Ordenar productos si se especifica el parámetro "sort"
        if (sort) {
            const sortOrder = sort === 'asc' ? 1 : -1;
            result = result.sort((a, b) => (a.price - b.price) * sortOrder);
        }

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


//Get: Para buscar el producto por id

router.get('/:pid', async(req, res)=> {

    try {
        const pid = parseInt(req.params.pid)
        const getProductId = await products.getProductoById(pid)
        res.status(200).json({message: `Producto encontrado por id: ${pid}`, product: [getProductId]})
        
    } catch (error) {

        if(error instanceof Error) {
            res.status(404).json({error: error.message})
        } else{
        res.status(500).json({error: 'Error al obtener el id del producto'})
        }
    }


})


//Put: Actualizar producto 

router.put('/:pid', async(req, res)=> {
    try {
        const pid = parseInt(req.params.pid)
        const updateBody = req.body;

        if (Object.keys(updateBody).length === 0) {
            res.status(404).json({error: 'No existe ninguna cambio para el producto'})
            return;
        }

        products.updateProduct(pid, updateBody)
        const productoForUpdate = await products.getProductoById(pid)
        res.status(200).json({messagge: `Producto ${pid} actualizado correctamente`,product:  [productoForUpdate] })



    } catch (error) {
        if(error instanceof Error){
            res.status(404).json({error: error.message})
        } else {
        res.status(500).json({error: 'Error al actualizar el producto'})
        }
    }


})


//Post: Crear un producto

router.post('/', async(req, res)=> {
    try {
        const bodyProd = req.body;
        products.addProducts(bodyProd)
        res.status(200).json({message: 'Producto creado correctamente', product: [bodyProd]})

    } catch (error) {

        if(error instanceof Error) {
            res.status(404).json({error: error.message})
        } else {
            res.status(500).json({error: 'Error al crear el producto'})
        }
    }
})




//Delete: Eliminar un producto 

router.delete('/:pid', async(req, res)=> {
    try {
        const pid = parseInt(req.params.pid)
        products.deleteProduct(pid)
        res.status(200).json({message: `Producto ${pid} eliminado correctamente`})

    } catch (error) {
        if(error instanceof Error){
            res.status(404).json({error: error.message})
        } else{        
        res.status(500).json({error: 'Error al eliminar el producto'})
        }
    }
})







export {router as productRouter}