import  express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))


const PUERTO = 8080
const httpServer = app.listen(PUERTO, () =>{
    console.log(`escuchando en ${PUERTO}`)
})
const io = new Server(httpServer)





app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views/')


app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/', viewsRouter)








