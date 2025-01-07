import { json, Router } from 'express'
import CartManager from '../manager/cartManager.js'


const cartRouter = Router()



const manager = new CartManager('./src/data/cart.json')


cartRouter.post('/', async (req, res) =>{
    const nuevoCarrito = await manager.crearCarrito()
    res.json(nuevoCarrito)
})


cartRouter.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid)

    const carritoBuscado = await manager.getCarritoId(cartId)
    res.json(carritoBuscado)
})

cartRouter.post("/:cid/products/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid); 
    const productId = req.params.pid; 
    const quantity = req.body.quantity || 1; 

        const actualizarCarrito = await manager.agregarProductoAlCarrito(cartId, productId, quantity); 
        res.json(actualizarCarrito.products);

})




export default cartRouter