//Variables para obtener los id.
const carrito = document.getElementById('carrito');
const productos = document.getElementById('app');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');




// Listeners
cargarEventListeners();
function cargarEventListeners(){
  // Dispara cuando se presiona "Agregar Carrito"
  productos.addEventListener('click', comprarProducto);
  // Cuando se elimina un producto del carrito
  carrito.addEventListener('click', eliminarProducto);
  // Al Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  // Al cargar el documento, mostrar LocalStorage
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}
// Funciones
// Función que añade el producto al carrito
function comprarProducto(e) {
  e.preventDefault();
  // Delegation para agregar-carrito
  if(e.target.classList.contains('agregar-carrito')) {
    const producto = e.target.parentElement.parentElement;
    // Enviamos el producto seleccionado para tomar sus datos
    leerDatosProducto(producto);
  }
}

// Lee los datos del producto
function leerDatosProducto(producto) {
  const infoProducto = {
    nombre: producto.querySelector('.card-title').textContent,
    precio: producto.querySelector('.card-text').textContent,
    id: producto.querySelector('a').getAttribute('data-id')
  }
  insertarCarrito(infoProducto);
}

function totalCount() {
  let totalCount = 0;
  productosLS = obtenerProductosLocalStorage();
  productosLS.forEach(function(producto){
      totalCount = totalCount + 1;
  });

  return totalCount;
}

function totalPrice(){
 
  let totalPrice = 0;
  productosLS = obtenerProductosLocalStorage();
  productCount = productosLS.length;
 
  productosLS.forEach(function(producto){
      totalPrice = producto.precio * productCount;
  });

  return totalPrice;
  
  
  
}$('.total-cart').html(totalPrice());



// Muestra el producto seleccionado en el Carrito
function insertarCarrito(producto) {
  
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>${producto.nombre}</td>
  <td>${producto.precio}</td>
  <td>
  <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
  </td>
  `;
  listaProductos.appendChild(row);
  guardarProductoLocalStorage(producto);
  $('.total-count').html(totalCount());
  $('.total-cart').html(totalPrice());
  
  
}
$('.total-count').html(totalCount());
// Elimina el producto del carrito en el DOM
function eliminarProducto(e) {
  e.preventDefault();
  let producto,
      productoId;
  if(e.target.classList.contains('borrar-producto') ) {
    e.target.parentElement.parentElement.remove();
    producto = e.target.parentElement.parentElement;
    productoId = producto.querySelector('a').getAttribute('data-id');
  }
  eliminarProductoLocalStorage(productoId);
  $('.total-count').html(totalCount());
}
// Elimina los productos del carrito en el DOM
function vaciarCarrito() {
  
  while(listaProductos.firstChild) {
    listaProductos.removeChild(listaProductos.firstChild);
  }

  // Vaciar Local Storage
  
  vaciarLocalStorage();
  $('.total-count').html(totalCount());
  $('.total-cart').html(totalPrice());
  return false;
}
// Almacena productos en el carrito a Local Storage
function guardarProductoLocalStorage(producto) {
  let productos;
  // Toma el valor de un arreglo con datos de LS o vacio
  productos = obtenerProductosLocalStorage();
  // el producto seleccionado se agrega al arreglo
  productos.push(producto);
  localStorage.setItem('productos', JSON.stringify(productos) );
}

// Comprueba que haya elementos en Local Storage
function obtenerProductosLocalStorage() {
  let productosLS;
  // comprobamos si hay algo en localStorage
  if(localStorage.getItem('productos') === null) {
    productosLS = [];
  } else {
    productosLS = JSON.parse( localStorage.getItem('productos') );
  }
  return productosLS;
}





// Imprime los productos de Local Storage en el carrito
function leerLocalStorage() {
  let productosLS;
  productosLS = obtenerProductosLocalStorage();
  productosLS.forEach(function(producto){
  // construir el template
  const row = document.createElement('tr');
  row.innerHTML = `
      <tr>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name="${producto.nombre}">-</button>
      <input type='number' class='item-count form-control' data-name="${producto.name}" value="${producto.count}">
      <button class='plus-item btn btn-primary input-group-addon' data-name="${producto.name}">+</button></div></td>
      <td> ${producto.total} </td>
      <td>
      <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
      </td>
      </tr>
      
  `;
  listaProductos.appendChild(row);
  });
}

// Elimina el producto por el ID en Local Storage
function eliminarProductoLocalStorage(producto) {
  let productosLS;
  // Obtenemos el arreglo de productos
  productosLS = obtenerProductosLocalStorage();
  // Iteramos comparando el ID del producto borrado con los del LS
  productosLS.forEach(function(productoLS, index) {
    if(productoLS.id === producto) {
      productosLS.splice(index, 1);
    }
  });
  // Añadimos el arreglo actual a storage
  localStorage.setItem('productos', JSON.stringify(productosLS) );
  $('.total-cart').html(totalPrice());
}

// Elimina todos los productos de Local Storage
function vaciarLocalStorage() {
  localStorage.clear();
}