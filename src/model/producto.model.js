import mongoose, { Schema } from "mongoose";


const productoSchema = new mongoose.Schema({
        title: {
            type:String
        },
        description: {
            type:String
        },
        thumbnail:{
            type:String
        },
        code:{
            type:String
        },
        price: {
            type:Number
        },
        stock:{
            type:Number
        },
        status:{
            type:Boolean
        },
        category:{
            type:String
        }
})

const productoModel = mongoose.model('products', productoSchema)

export default productoModel