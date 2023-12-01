
// se conecta el cliente con el servidor
const socket = io()

// Toma el valor de todos los inputs
const productForm = document.getElementById('product-form')
productForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(productForm);
    const title = formData.get('title');
    const description = formData.get('description');
    const price = formData.get('price');
    const thumbnails = formData.get('thumbnails');
    const code = formData.get('code');
    const stock = formData.get('stock');
    const category = formData.get('category');

    const newProduct = {
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        category,
    }

    socket.emit('new-product', newProduct)
    productForm.reset();
})



const productContainer = document.querySelector('.real-time_list');


// Recibe el producto nuevo creado por formulario y lo renderiza
socket.on('product-created', (productCreated)=> {
    if(productCreated && productCreated.thumbnails) {
        const productContainer = document.getElementById('container-realTime')
        const newProduct =document.createElement('div');
        newProduct.setAttribute('data-id', productCreated._id)
        newProduct.classList.add('card')
        newProduct.innerHTML =`
            <article>
                <img src="${productCreated.thumbnails}" alt="" width="200px">
            </article>
            <div class="card-body">
                <h4>${productCreated.title}</h4>
                <p>$${productCreated.price}</p>
                <button class="delete-product" id="delete-product" data-id="${productCreated._id}">Eliminar</button>
            </div>`
            productContainer.appendChild(newProduct)
            
    }
})



// Verifica el producto con el id que se selecciono y lo envia al servidor para que lo elimine
productContainer.addEventListener('click', (event)=> {
    if(event.target.classList.contains('delete-product')){
        const productId =event.target.getAttribute('data-id');
        socket.emit('deleteProduct', productId)
    }
})


// recibe el id del producto eliminado en el json y lo elimina de la vista
socket.on('deleting-product', (deleteProduct)=> {
    const productElement = document.querySelector(`div[data-id="${deleteProduct}"]`)
    if(productElement) {
        productElement.remove();
        console.log(`producto ${deleteProduct} eliminado correctamente`)
    }
})



// Se puede ver en la consola del navegador
socket.on('mensajeGeneral', data => {
    console.log(data)
})