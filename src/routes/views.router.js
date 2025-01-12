import { Router } from "express";
import ProductManager from "../manager/productManager.js";

const viewsRouter = Router()
const manager = new ProductManager('./src/data/products.json')


viewsRouter.get('/products', async (req,res)=>{
    const productos = await manager.getProducts()
    res.render('home', {productos})
    
})

viewsRouter.get('/realtimeproducts', async (req, res)=>{
    res.render('realtimeproducts')
})

export default viewsRouter