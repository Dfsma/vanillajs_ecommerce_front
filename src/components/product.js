class Product {
    constructor(name) {
        this.name = name;
    
    }
  
    createProductCard() {
        const card = document.createElement('div')
        card.className = "card"
        const cardInfo = document.createElement('div')
        cardInfo.className = "card-info"
        const name = document.createElement('h1')
        name.innerHTML = this.name
        cardInfo.appendChild(name)


        card.appendChild(cardInfo)
        

        document.getElementById('product-card-container').appendChild(card)
      }
  }