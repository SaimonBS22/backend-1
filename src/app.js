import  express from 'express'
import productRouter from '../routes/products.router.js'
import cartRouter from '../routes/cart.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PUERTO = 8080


app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

app.listen(PUERTO, () =>{
    console.log('escuchanding 8080')
})