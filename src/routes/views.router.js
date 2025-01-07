import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get('/', (req,res)=>{
    res.render('home')
})

export default viewsRouter