import { json, Router } from 'express'
import ProductManager from "../src/manager/productManager.js"


const cartRouter = Router()





const manager = new ProductManager('./src/data/cart.json')

cartRouter.get('/', async (req, res)=>{
    const productos = await manager.readFile()

    res.send(productos)
})


cartRouter.post('/', async (req, res) =>{
    let id = Date.now().toString()
    let products = Array.isArray(req.body) ? req.body : [req.body]
   
    let productosConId = products.map((product)=>{
        return{
            ...product,
            id:`${id}-1`
        }
    })
    console.log(productosConId)

    let nuevoCarrito = {
        id : id,
        products : productosConId

    }
 try{
    let carritosExistentes = await manager.readFile();
    if (!Array.isArray(carritosExistentes)) {
        carritosExistentes = []; 
    }
    carritosExistentes.push(nuevoCarrito);

    await manager.saveFile(carritosExistentes)
    res.send('producto creado')
}
 catch(error){
    res.send('producto no creado' + error)
 }
})


cartRouter.get('/:cid', async (req, res) => {
    const id = req.params.cid;
    let productoId = await manager.readFile(id)
    productoId = await manager.getProductsId(id)
    res.send(productoId)
})

cartRouter.post('/:cid/products/:pid', async (req, res)=>{
    const id = req.params.cid;

    const carritoId = await manager.readFile(id)
    let quantity = (qty) =>{
        if(carritoId === carritoId){
            qty++
        }
    }
    let carrito = {
        product : carritoId,
        quantity: quantity()
    }

    await manager.saveFile(carrito)
    res.send('se creo')
})




export default cartRouter