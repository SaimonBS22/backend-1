import { Router } from 'express'
import ProductManager from '../manager/productManager.js'


const productRouter = Router()

const manager = new ProductManager('./src/data/products.json')



productRouter.get('/', async (req, res) => {
    let limit = req.query.limit
    const productos = await manager.getProducts()
    if(limit){
        res.send(productos.slice(0,limit))
    }else{
    res.send({
        status: 'success', 
        productos
    })
}})


productRouter.get('/:pid', async (req, res) => {
   const id = req.params.pid
   const productoId = await manager.getProductsId(id)
   res.send(productoId)

})

productRouter.post('/', async (req, res) =>{
    const { title, description, price, thumbnail, code, stock, status, category} = req.body
    const nuevoProducto = await manager.addProducts( title, description, price, thumbnail, code, stock, status, category)
   await manager.saveFile(nuevoProducto)
   
   res.send('producto creado')

})

productRouter.put("/:pid", async (req ,res) =>{
    try{
        const id = req.params.pid

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
} catch(error){

    console.log('hubo un error')
}
})

productRouter.delete("/:pid", async (req ,res) =>{
    const id = req.params.pid

    const products = await manager.getProducts()

    const productoIndex = products.findIndex(producto => producto.id === id)

    if(productoIndex !== -1){
        products.splice(productoIndex, 1)

        await manager.saveFile(products)

        res.send('producto erradicado')
    }else{
        res.send('el producto no se pudo erradicar')
    }
})


export default productRouter
