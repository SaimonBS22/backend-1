import { error } from 'console';
import {promises as fs} from 'fs'

class CartManager{
    constructor(path){
        this.path = path,
        this.carts = [],
        this.ultId = 0;

        this.cargarCarrito()
    }

    async cargarCarrito(){
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(data)
            if(this.carts.length > 0){
                this.ultId = Math.max(...this.carts.map(cart => cart.id))
            }
        } catch (error) {
            await this.guardarCarrito()
        }
    }
    async guardarCarrito(){
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2))
    }

    async crearCarrito(){
        const nuevoCarrito = {
            id: ++this.ultId,
            products: []
        }
        this.carts.push(nuevoCarrito)

        await this.guardarCarrito()
        return nuevoCarrito
    }

    async getCarritoId(cartId){
        const carrito = this.carts.find(cart => cart.id === cartId)

        if(!carrito){
            throw new Error('no existe un carrito con ese id')
        }
        return carrito
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1){
        const carrito = await this.getCarritoId(cartId)

        const existeProducto = carrito.products.find(p => p.product === productId)
        

        if(existeProducto){
            existeProducto.quantity += quantity
        }else{
            carrito.products.push({product:productId, quantity})
        }

        await this.guardarCarrito()
        return carrito
    }
}



export default CartManager