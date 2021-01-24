const baseURL = "https://bsalebackend.herokuapp.com/products";

function getProducts() {
  return fetch("https://bsalebackend.herokuapp.com/products")
    .then((response) => {
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.products);
      const html = data.products
        .map((product) => {
          return `
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top img-fluid" src="${product.url_image}" alt="${product.name}" style="width:100%; height:30%;">
                <div class="card-body">
                  <h4><b>${product.name}</b></h4>
                  <p>Precio: ${product.price}</p>
                  <p>Descuento: ${product.discount} %</p>
                </div>
              </div>
            </div>
            
            `;
        })
        .join("");
      document.querySelector("#app").innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getProductsByCategory() {
    

}




getProducts();
getProductsByCategory();