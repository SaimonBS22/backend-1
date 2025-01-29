import  express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import ProductManager from './manager/productManager.js'
import productoModel from './model/producto.model.js'

const manager = new ProductManager('./src/data/products.json')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))




const PUERTO = 8080
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se conectó");

  
    socket.emit("productos", await manager.getProducts());

  
    socket.on("agregarProducto", async (producto) => {
        await manager.addProducts(
            producto.title,
            producto.description,
            producto.price,
            producto.img,
            producto.code,
            producto.stock,
            producto.status,
            producto.category
        );
        const productosActualizados = await manager.getProducts();
        io.sockets.emit("productos", productosActualizados);
    });

    socket.on("eliminarProducto", async (id) => {
        const productos = await manager.getProducts();
        const productosFiltrados = productos.filter((item) => item.id !== id);

        await manager.saveFile(productosFiltrados); 
        io.sockets.emit("productos", productosFiltrados); 
    });
});







app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views/')


app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/', viewsRouter)


mongoose.connect('mongodb+srv://simonblaksley:pepo300523@cluster0.1xoua.mongodb.net/entregaFinal?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{console.log('Conectado a MongoDb')})
.catch((err)=>{console.error('Hubo un error', err)})


const respuesta = await productoModel.find().lean()
console.log(respuesta)









