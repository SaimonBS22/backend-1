import  express from 'express'
import  ProductManager from './manager/productManager.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PUERTO = 8080


const manager = new ProductManager('./src/data/products.json')




app.get('/', (req, res) =>{
    res.send('HOstia tio!')
})

app.get('/api/products', async (req, res) => {
    const productos = await manager.getProducts()
    res.send({
        status: 'success', 
        productos
    })
})


app.get('/api/products/:pid', async (req, res) => {
   const id = req.params.pid;
   const productoId = await manager.getProductsId(id)
   res.send(productoId)

})

app.post('/api/products', async (req, res) =>{
    let id = ++ProductManager.id
    const { title, description, price, thumbnail, code, stock, status, category} = req.body
    const nuevoProducto = await manager.addProducts(id.toString(), title, description, price, thumbnail, code, stock, status, category)
   await manager.saveFile(nuevoProducto)
   
   res.send('producto creado')

})

app.put("/api/products/:pid", async (req ,res) =>{
    const id = parseInt(req.params.pid)

    const {title, description, price, thumbnail, code, stock, status, category} = req.body
    const products = await manager.getProducts()

    const productoIndex = products.findIndex(producto => producto.id === id)

    if(productoIndex !== -1){
        const productos = products[productoIndex]
        productos.title = title
        productos.description = description
        productos.price = price
        productos.thumbnail = thumbnail
        productos.code = code
        productos.stock = stock
        productos.status = status
        productos.category = category

        await manager.saveFile(products)

        res.send('producto actualizado')
    }else{
        res.send('producto no actualizado')
    }
})

app.delete("/api/products/:pid", async (req ,res) =>{
    const id = parseInt(req.params.pid)

    const products = await manager.getProducts()

    const productoIndex = products.findIndex(producto => producto.id === id)

    if(productoIndex !== -1){
        products.splice(productoIndex, 1)

        await manager.saveFile(products)

        res.send('producto erradicado')
    }else{
        res.send('producto no actualizado')
    }
})

app.listen(PUERTO, () =>{
    console.log('escuchanding 8080')
})