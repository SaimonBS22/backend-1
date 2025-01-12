const socket = io()

socket.on('productos', (data) =>{
    renderProducto(data)
})


const renderProducto =  (productos)=>{

    const contenedorProductos = document.getElementById('contenedorProductos')

   productos.forEach( item =>{
        const producto = document.createElement('div')
        producto.innerHTML = `
                                <p>${item.title}</p>
                                <p>${item.description}</p>
                                <p>${item.price}</p>
                                <p>${item.thumbnail}</p>
                                <p>${item.code}</p>
                                <p>${item.stock}</p>
                                <p>${item.category}</p>
                                <p>${item.status}</p>
        `
        contenedorProductos.appendChild(producto)  
    })
}

document.getElementById('botonAgregar').addEventListener('click', ()=>{
    agregarProducto();
})

const agregarProducto = ()=>{
    const producto = {
        title : document.getElementById('title').value,
        descripcion : document.getElementById('description').value,
        precio : document.getElementById('price').value,
        img : document.getElementById('img').value,
        codigo : document.getElementById('code').value,
        stock : document.getElementById('stock').value,
        categoria : document.getElementById('category').value,
        status : document.getElementById('status').value === 'true'
    }
    socket.emit('agregarProucto', producto)
}