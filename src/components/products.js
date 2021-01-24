class Products {
    constructor() {
      this.products = [];
      this.adapter = new ProductsAdapter();
      
      this.cardContainer = document.getElementById('product-card-container');
      
      this.fetchAndLoadProducts();
    }
  
    fetchAndLoadProducts() {
      this.adapter.getProducts().then(products => this.createProducts(products)).then(() => this.addProductsToDom())
    }

    createProducts(products) {
        for (let product of this.products) {
          this.products.push(new Product(data.product.name, product.attributes.url_image, product.attributes.price, product.attributes.discount))
        }
    }

    addProductsToDom() {
        for (let product of this.products) {
          product.createProductCard()
        }
    }
  
  }