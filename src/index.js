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
          const name = product.name;
          
          return `
            <div class="col-md-3 col-sm-6 animate__animated animate__backInDown animate__slow">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top img-fluid" src="${product.url_image}" alt="${product.name}" style="width:100%; height:30%;">
                <div class="card-body">
                  <h4  class="card-title"><b>${product.name}</b></h4>
                  <p  class="card-text">Precio: $ ${product.price}</p>
                  <p>Descuento: ${product.discount} %</p>
                  <p class="text-info">Categoria: ${product.category.name}</p>
                  <a href="#" class="agregar-carrito btn btn-info" data-id="${product.id}"><i class="fa fa-cart-plus"></i>&nbsp;  AGREGAR AL CARRITO</a>
                </div>
              </div>
            </div>
            
            `;
        })
        .join("");
        document.querySelector("#app").innerHTML = html;
        hideSpinner();
      }, 1500);
     
        
      
      
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
            <div class="col-md-3 col-sm-6 animate__animated animate__backInDown animate__slow">
            <div class="card mb-4 box-shadow">
              <img class="card-img-top img-fluid" src="${product.url_image}" alt="${product.name}" style="width:100%; height:30%;">
              <div class="card-body">
                <h4  class="card-title"><b>${product.name}</b></h4>
                <p  class="card-text">Precio: $ ${product.price}</p>
                <p>Descuento: ${product.discount} %</p>
                <p class="text-info">Categoria: ${product.category.name}</p>
                <a href="#" class="agregar-carrito btn btn-info" data-id="${product.id}"><i class="fa fa-cart-plus"></i>&nbsp;  AGREGAR AL CARRITO</a>
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









getProducts();
getCategories();
getSelectedOption();
