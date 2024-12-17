import { json, Router } from 'express'
import ProductManager from "../src/manager/productManager.js"


const cartRouter = Router()





const manager = new ProductManager('./src/data/cart.json')

cartRouter.get('/', async (req, res)=>{
    const productos = await manager.getProducts()

    res.send(productos)
})


cartRouter.post('/', async (req, res) =>{
    let id = Date.now().toString()
    let products = req.body
    let nuevoCarrito = {
        id : id,
        products : [products]

    }
 try{
    let carritosExistentes = await manager.readFile();
    if (!carritosExistentes) {
        carritosExistentes = []; 
    }
    carritosExistentes.push(nuevoCarrito);

    await manager.saveFile(carritosExistentes);

    res.send('producto creado')
}
 catch(error){
    res.send('producto no creado')
 }
})


cartRouter.get('/:cid', async (req, res) => {
    // const id = req.params.cid;
    // const productoId = await manager.readFile(id)


    // res.send(productoId)
    
    
})




export default cartRouter