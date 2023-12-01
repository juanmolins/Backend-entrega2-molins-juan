import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import {productRouter} from './routes/product.routes.js'
import {cartRouter} from './routes/carts.routes.js'
import { viewRouter } from './routes/view.routes.js'
import ProductManager from './dao/fileSystem/controllers/controllers/ProductManager.js'
import { MessageMongoManager } from './dao/mongo/MessageMongoManager.js'
import { ProductMongoManager } from './dao/mongo/ProductMongoManager.js'
import { connectDb } from './config/dbConnection.js'



// Manager de Mongo
const messageManager = new MessageMongoManager()
const productMongo = new ProductMongoManager();

// Manager de fileSystem
const product = new ProductManager()


// genera los datos para crear el servidor
const app = express()
const port = 8080;


// Conexion a la base de datos
connectDb


// Configurar express para que pueda entender los datos json y formulario
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configurar carpeta public
app.use(express.static(__dirname + '/public'))


// Configurar handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// Configurar rutas de express
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(viewRouter)


// Configurar servidor
const httpServer = app.listen(port, ()=> console.log(`Server Up ${port}`));
const io = new Server(httpServer)

// Configurar socket del lado del servidor
io.on('connection', async(socket)=> {
    console.log(`Cliente nuevo conectado ${socket.id}`)

// recibe el producto y lo guarda (mongo)
    socket.on('new-product', async(newProduct)=> {
        try {
            const newProductCreated = await productMongo.addNewProducts(newProduct)
            io.emit('product-created', newProductCreated)
        } catch (error) {
            console.error(`Error al crear el producto ${error}`)
        }
    })

// Recibe el id del producto que quiere eliminar (mongo)
    socket.on('deleteProduct', async(productId)=> {
        try {
        await productMongo.deleProduct(productId)
        io.emit('deleting-product', productId)
        } catch (error) {
            console.error(`Error al eliminar el producto ${error}`)
        }
    })
    

    // obtiene los mensjaes
    try {
        const messageData2 =  await messageManager.getAllMessagesChat()
        io.emit('messagesLogs', messageData2)
    } catch(error) {
        console.error('Error al obtener los mensajes')
    }

    // obtiene los mensajes nuevos de los clientes
    socket.on('message', async(data)=> {
        const {user, message} = data
        try {
            await messageManager.addNewMessage(user, message)
            const messageData = await messageManager.getAllMessagesChat()
            io.emit('messagesLogs', messageData)
        } catch (error) {
            console.error('Error al guardar el mensaje')
        }
    })
    
    
    io.emit('mensajeGeneral', 'Este es un mensaje para todos')
})