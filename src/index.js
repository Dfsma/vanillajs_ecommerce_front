const baseURL = "https://bsalebackend.herokuapp.com/products";
const baseUrlCategories = "https://bsalebackend.herokuapp.com/categories";
const baseUrlProductsByCategory = "https://bsalebackend.herokuapp.com/categories";


const loader = document.querySelector("#loading");

var loadingDiv = document.getElementById('loading');

function showSpinner() {
  loadingDiv.style.visibility = 'visible';
}

function hideSpinner() {
  loadingDiv.style.visibility = 'hidden';
}

function getProducts() {
  showSpinner();
  return fetch(baseURL)
    
    .then((response) => {
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
      
      
    })
    .then((data) => {
      //console.log(data);
      
      setTimeout(()=> {
        const html = data.attributes
        .map((product) => {
          
          return `
            <div class="col-md-4 animate__animated animate__backInDown">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top img-fluid" src="${product.url_image}" alt="${product.name}" style="width:100%; height:30%;">
                <div class="card-body">
                  <h4><b>${product.name}</b></h4>
                  <p>Precio: $ ${product.price}</p>
                  <p>Descuento: ${product.discount} %</p>
                  <p class="text-info">Categoria: ${product.category.name}</p>
                  <a href="#" data-name="${product.name}" data-price="${product.price}" class="add-to-cart btn btn-primary">Add to cart</a>
                </div>
              </div>
            </div>
            
            `;
        })
        .join("");
        document.querySelector("#app").innerHTML = html;
        hideSpinner();
      }, 2000);
     
        
      
      
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCategories() {
  return fetch(baseUrlCategories)
    .then((response) => {
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      const html = data
      
        .map((category) => {
          
          return `
           
            <option id="category" value="${category.id}">${category.name}</option>
            
          `;
        })
        .join("");
      document.querySelector("#categoryDropDown").insertAdjacentHTML("beforeend",html)
    });
}

function getSelectedOption() {
  
  const select = document.getElementById("categoryDropDown");
  select.addEventListener("change", function () {
    const selectedOption = this.options[select.selectedIndex];
    clearProducts();
    getProductsByCategory(selectedOption.value);
  });
 
}

function getProductsByCategory(selectedOption) {
  showSpinner();
  return fetch(baseUrlProductsByCategory + `/${selectedOption}` + `/products`)
    .then((response) => {
      if (!response.ok) {
        throw Error("Error");
      }
      
      return response.json();
     
    })
    .then((data) => {
      
      
        const html = data.attributes
        .map((product) => {
          
          return `
            <div class="col-md-4 animate__animated animate__backInDown">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top img-fluid" src="${product.url_image}" alt="${product.name}" style="width:100%; height:30%;">
                <div class="card-body">
                  <h4><b>${product.name}</b></h4>
                  <p>Precio: ${product.price}</p>
                  <p>Descuento: ${product.discount} %</p>
                  <p class="text-info">Categoria: ${product.category.name}</p>
                  <a href="#" data-name="${product.name}" data-price="${product.price}" class="add-to-cart btn btn-primary">Add to cart</a>
                  </div>
              </div>
            </div>
            
            `;
        })
        .join("");
        document.querySelector("#app").innerHTML = html;
        hideSpinner();
     
      
    });
}


function clearProducts() {
  document.querySelector("#app").innerHTML = "";
}


const shoppingCart = (function() {
  cart = [];

  function Item(name, price){
    this.name = name;
    this.price = price;
  }

  

// Save cart
function saveCart() {
  sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}
function loadCart() {
  cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
}
if (sessionStorage.getItem("shoppingCart") != null) {
  loadCart();
}

const obj = {};

obj.addItemToCart = function(name, price, count){
  for(let item in cart) {
    if(cart[item].name === name) {
      cart[item].count ++;
      saveCart();
      return;
    }
  }
  let item = new Item(name, price, count);
  cart.push(item);

  saveCart();
}



// Set count from item
obj.setCountForItem = function(name, count) {
  for(var i in cart) {
    if (cart[i].name === name) {
      cart[i].count = count;
      break;
    }
  }
};

// Remove item from cart
obj.removeItemFromCart = function(name) {
  for(var item in cart) {
    if(cart[item].name === name) {
      cart[item].count --;
      if(cart[item].count === 0) {
        cart.splice(item, 1);
      }
      break;
    }
}
saveCart();
}

// Remove all items from cart
obj.removeItemFromCartAll = function(name) {
  for(var item in cart) {
    if(cart[item].name === name) {
      cart.splice(item, 1);
      break;
    }
  }
  saveCart();
}

// Clear cart
obj.clearCart = function() {
  cart = [];
  saveCart();
}
// Count cart 
obj.totalCount = function() {
  var totalCount = 0;
  for(var item in cart) {
    totalCount += cart[item].count;
  }
  return totalCount;
}
// Total cart
obj.totalCart = function() {
  var totalCart = 0;
  for(var item in cart) {
    totalCart += cart[item].price * cart[item].count;
  }
  return Number(totalCart.toFixed(2));
}
// List cart
obj.listCart = function() {
  var cartCopy = [];
  for(i in cart) {
    item = cart[i];
    itemCopy = {};
    for(p in item) {
      itemCopy[p] = item[p];

    }
    itemCopy.total = Number(item.price * item.count).toFixed(2);
    cartCopy.push(itemCopy)
  }
  return cartCopy;
}
return obj;
})();

$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);


  console.log(name);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  var cartArray = shoppingCart.listCart();

  console.log(cartArray)
  var output = "";
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});



getProducts();
getCategories();
getSelectedOption();
displayCart();