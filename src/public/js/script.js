const socket = io();

socket.on("productos", (data) => {
    renderProductos(data);
});

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";
    productos.forEach((item) => {
        const card = document.createElement("div");
        card.innerHTML = `
            <p><strong>Título:</strong> ${item.title}</p>
            <p><strong>Precio:</strong> $${item.price}</p>
            <p><strong>Descripción:</strong> ${item.description}</p>
            <button>Eliminar</button>
        `;
        contenedorProductos.appendChild(card);
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id); 
    });

        });

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id);
};

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto();
});

const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: parseInt(document.getElementById("stock").value, 10),
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
    };

    if (!producto.title || !producto.price || !producto.description) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    socket.emit("agregarProducto", producto);
};
}
