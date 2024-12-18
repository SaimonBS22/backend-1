import  express from 'express'
import productRouter from '../routes/products.router.js'
import cartRouter from '../routes/cart.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PUERTO = 8080


app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)



app._router.stack.forEach((layer) => {
    if (layer.route) {
        console.log('Ruta registrada:', layer.route.path);
    } else if (layer.name === 'router') {
        layer.handle.stack.forEach((nestedLayer) => {
            if (nestedLayer.route) {
                console.log('Ruta registrada:', nestedLayer.route.path);
            }
        });
    }
});



app.listen(PUERTO, () =>{
    console.log('escuchanding 8080')
})