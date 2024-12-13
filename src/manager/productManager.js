import {promises as fs} from 'fs'
import { json } from 'stream/consumers';

class ProductManager{
    static id = 0;
    constructor(path){
        this.products = [];
        this.path = path;
    }
    async addProducts(id, title, description, price, thumbnail, code, stock, status, category){

        const arrayProducts = await this.readFile()

        if(!id ||!title || !description || !price || !thumbnail || !code || !stock || !status || !category){
            console.log('Todos los campos son obligatorios')
            return;
        }
        if (arrayProducts.some(item => item.code == code)) {
            console.log('no se puede repetir el código');
            return;
        }
        const nuevoProducto = {
            id: ++ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }
        arrayProducts.push(nuevoProducto)

        await this.saveFile(arrayProducts)
    }
    async getProducts(){
        const arrayProducts = await this.readFile()
        return arrayProducts
    }

    async getProductsId(id){

        const arrayProducts =  await this.readFile()
      
        const producto = arrayProducts.find(item => item.id === id)
        
        if(!producto){
            return {error:'No encontrado'}
        }else{
        return producto
        }
    }
        
    
    async saveFile(arrayProducts){
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2))
        } catch (error) {
            console.log('hubo un error guardando el archivo')
        }
    }
    
    async readFile(){
        try {
            const respuesta = await fs.readFile(this.path, 'utf-8')
            const arrayProducts = JSON.parse(respuesta)
            return arrayProducts
        } catch (error) {
            console.log('hubo un error al leer el archivo')
        }
    }
}
export default ProductManager