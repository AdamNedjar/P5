const url = "http://localhost:3000/api/products"
const sectionItems = document.getElementById("items")

const getArticles = () => {
    fetch(url)
    .then(function (res) {
       return res.json()
    })
    .then(function (data) {
        console.log(data)
        for(product in data) {
            sectionItems.innerHTML += `<a href="./product.html?id=${data[product]._id}">
            <article>
              <img src="${data[product].imageUrl}" alt="${data[product].altTxt}">
              <h3 class="productName">${data[product].name}</h3>
              <p class="productDescription">${data[product].description}</p>
            </article>
          </a>`
        }

    })

}

getArticles()